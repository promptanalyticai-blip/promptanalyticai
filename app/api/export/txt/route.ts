export async function GET() {
  return Response.json(
    { error: "TXT export not implemented" },
    { status: 501 }
  );
}
