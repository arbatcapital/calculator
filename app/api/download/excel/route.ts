import { exportToExcel } from "@/lib/actions";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const buffer = await exportToExcel();

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
