export async function GET() {
  return Response.json(
    { error: "PDF report export not implemented" },
    { status: 501 }
  );
}
