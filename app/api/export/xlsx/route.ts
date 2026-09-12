export async function GET() {
  return Response.json(
    { error: "XLSX export not implemented" },
    { status: 501 }
  );
}
