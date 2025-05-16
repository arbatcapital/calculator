import { exportToExcelBufferSingleItem } from "@/lib/actions";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const docId = searchParams.get("docId");

  if (!docId) {
    return new Response(
      JSON.stringify({ success: false, message: "Application not found" }),
      {
        status: 400,
      }
    );
  }

  try {
    const { success, message, buffer } = await exportToExcelBufferSingleItem(
      docId
    );

    if (!success || !buffer) {
      return NextResponse.json({ success, message }, { status: 400 });
    }
    return new NextResponse(buffer, {
      headers: {
        "Content-Type":
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "Content-Disposition": `attachment; filename=applications.xlsx`,
      },
    });
  } catch (error) {
    console.log(error);
    return new NextResponse("Failed to export Excel", { status: 500 });
  }
}
