import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    const { userId } = auth();
    if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const url = new URL(req.url);
    const reportId = url.searchParams.get("reportId");
    const mode = url.searchParams.get("mode") || "simple";
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
      const csv = `title,content\n"${title}","${content.replace(/"/g, '""')}"`;

      return new NextResponse(csv, {
        headers: {
          "Content-Type": "text/csv",
          "Content-Disposition": `attachment; filename="${title}.csv"`,
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

      let foundKeyword