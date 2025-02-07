import dbConnect from "../../../lib/dbConnect"
import Prayer from "@/models/prayer";
import { NextResponse } from "next/server";
export async function GET() {
    try {
      await dbConnect();
      const qazaPrayers = await Prayer.find({ "prayers.qaza": true });
      return NextResponse.json({ qazaPrayers }, { status: 200 });
    } catch (error) {
      console.error("Error fetching qaza prayers:", error);
      return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
  }