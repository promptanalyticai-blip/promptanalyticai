import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    const { userId } = auth();
    if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const url = new URL(req.url);
    const reportId = url.searchParams.get("reportId");
    const mode = url.searchParams.get("mode") || "auto";
    const workspaceId = url.searchParams.get("workspaceId");

    if (!reportId) {
      return NextResponse.json({ error: "reportId is required" }, { status: 400 });
    }

    if (!workspaceId) {
      return NextResponse.json({ error: "workspaceId is required" }, { status: 400 });
    }

    const report = await prisma.report.findFirst({
      where: { id: reportId, userId, workspaceId },
    });

    if (!report) {
      return NextResponse.json({ error: "Report not found" }, { status: 404 });
    }

    const title = report.title || "Untitled";
    const content = report.content || "";

    // SIMPLE MODE
    if (mode === "simple") {
      const json = {
        title,
        content,
      };

      return NextResponse.json(json, {
        headers: {
          "Content-Disposition": `attachment; filename="${title}.json"`,
        },
      });
    }

    // STRUCTURED MODE (INTELLIGENT)
    const sections = [];

    // 1. Detect Markdown headers
    const headerRegex = /^#{1,6}\s+(.*)$/gm;
    const markdownMatches = [...content.matchAll(headerRegex)];

    if (markdownMatches.length > 0) {
      for (let i = 0; i < markdownMatches.length; i++) {
        const sectionTitle = markdownMatches[i][1];
        const startIndex = markdownMatches[i].index;
        const endIndex =
          i + 1 < markdownMatches.length
            ? markdownMatches[i + 1].index
            : content.length;

        const sectionContent = content.slice(startIndex, endIndex).trim();
        sections.push({ section: sectionTitle, content: sectionContent });
      }
    } else {
      // 2. Detect keyword-based sections
      const keywords = [
        "Introducción",
        "Análisis",
        "Conclusión",
        "Resumen",
        "Hallazgos",
        "Recomendaciones",
      ];

      let foundKeyword = false;

      for (const keyword of keywords) {
        if (content.includes(keyword)) {
          foundKeyword = true;
          const parts = content.split(keyword).slice(1);

          parts.forEach((p, idx) => {
            sections.push({
              section: `${keyword} ${idx + 1}`,
              content: p.trim(),
            });
          });
        }
      }

      // 3. If no keywords found → split by blank lines
      if (!foundKeyword) {
        const blocks = content.split(/\n\s*\n/);

        blocks.forEach((block, idx) => {
          sections.push({
            section: `Bloque ${idx + 1}`,
            content: block.trim(),
          });
        });
      }
    }

    const json = {
      title,
      sections,
    };

    return NextResponse.json(json, {
      headers: {
        "Content-Disposition": `attachment; filename="${title}_structured.json"`,
      },
    });

  } catch (error) {
    console.error("JSON EXPORT ERROR:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
