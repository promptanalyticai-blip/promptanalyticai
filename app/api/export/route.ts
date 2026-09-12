import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import JSZip from "jszip";
import { prisma } from "@/lib/prisma";
import { exportToMarkdown } from "@/lib/export/md";
import { exportToPDF } from "@/lib/export/pdf";
import { exportToCSV } from "@/lib/export/csv";
import { exportToTXT } from "@/lib/export/txt";
import { exportToJSON } from "@/lib/export/json";
import { exportToXLSX } from "@/lib/export/xlsx";

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    // Parse JSON body
    const body = await req.json().catch(() => null);

    // Parse query params
    const url = new URL(req.url);
    const idsFromQuery = url.searchParams.get("ids");
    const formatFromQuery = url.searchParams.get("format");
    const modeFromQuery = url.searchParams.get("mode");
    const workspaceFromQuery = url.searchParams.get("workspaceId");

    // Merge params (body has priority)
    const ids = body?.ids || (idsFromQuery ? idsFromQuery.split(",") : []);
    const format = body?.format || formatFromQuery || "md";
    const mode = body?.mode || modeFromQuery || "single";
    const workspaceId = body?.workspaceId || workspaceFromQuery;

    if (!ids.length) {
      return NextResponse.json({ error: "No report IDs provided" }, { status: 400 });
    }

    if (!workspaceId) {
      return NextResponse.json({ error: "workspaceId is required" }, { status: 400 });
    }

    // Validate reports ownership
    const reports = await prisma.report.findMany({
      where: {
        id: { in: ids },
        userId,
        workspaceId,
      },
    });

    if (reports.length === 0) {
      return NextResponse.json({ error: "No reports found" }, { status: 404 });
    }

    // Export logic
    const exportedFiles: { name: string; content: Uint8Array | string }[] = [];

    for (const report of reports) {
      let file;

      switch (format) {
        case "md":
          file = await exportToMarkdown(report);
          exportedFiles.push({ name: `${report.title}.md`, content: file });
          break;

        case "pdf":
          file = await exportToPDF(report);
          exportedFiles.push({ name: `${report.title}.pdf`, content: file });
          break;

        case "csv":
          file = await exportToCSV(report);
          exportedFiles.push({ name: `${report.title}.csv`, content: file });
          break;

        case "txt":
          file = await exportToTXT(report);
          exportedFiles.push({ name: `${report.title}.txt`, content: file });
          break;

        case "json":
          file = await exportToJSON(report);
          exportedFiles.push({ name: `${report.title}.json`, content: file });
          break;

        case "xlsx":
          file = await exportToXLSX(report);
          exportedFiles.push({ name: `${report.title}.xlsx`, content: file });
          break;

        default:
          return NextResponse.json({ error: "Invalid format" }, { status: 400 });
      }
    }

    // ZIP mode
    if (mode === "zip" && exportedFiles.length > 1) {
      const zip = new JSZip();

      for (const file of exportedFiles) {
        zip.file(file.name, file.content);
      }

      const zipContent = await zip.generateAsync({ type: "uint8array" });

      return new NextResponse(zipContent, {
        headers: {
          "Content-Type": "application/zip",
          "Content-Disposition": `attachment; filename="export.zip"`,
        },
      });
    }

    // Single file mode (combine)
    if (mode === "single" && exportedFiles.length > 1) {
      const combinedName = `combined.${format}`;
      let combinedContent = "";

      for (const file of exportedFiles) {
        combinedContent += `\n\n===== ${file.name} =====\n\n`;
        combinedContent += typeof file.content === "string"
          ? file.content
          : new TextDecoder().decode(file.content);
      }

      return new NextResponse(combinedContent, {
        headers: {
          "Content-Type": "text/plain",
          "Content-Disposition": `attachment; filename="${combinedName}"`,
        },
      });
    }

    // Single file (only one report)
    const single = exportedFiles[0];

    return new NextResponse(single.content, {
      headers: {
        "Content-Type": "application/octet-stream",
        "Content-Disposition": `attachment; filename="${single.name}"`,
      },
    });

  } catch (error) {
    console.error("EXPORT ERROR:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
