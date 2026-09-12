export async function GET() {
  return Response.json(
    { error: "Metrics export not implemented" },
    { status: 501 }
  );
}
