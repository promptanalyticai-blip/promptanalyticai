export async function GET() {
  return Response.json(
    { error: "PDF export not implemented" },
    { status: 501 }
  );
}
