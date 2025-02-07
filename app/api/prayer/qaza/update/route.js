import dbConnect from "../../../lib/dbConnect"
import Prayer from "@/models/prayer";
import { NextResponse } from "next/server";
export async function PATCH(request) {
  try {
    const { userId, prayer } = await request.json();
    if (!userId || !prayer) {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }

    await dbConnect();
    let prayerRecord = await Prayer.findOne({ userId, "prayers.qaza": true });
    if (!prayerRecord || !prayerRecord.prayers[prayer]) {
      return NextResponse.json({ error: "Qaza prayer not found" }, { status: 400 });
    }

    prayerRecord.prayers[prayer].qaza = false;
    prayerRecord.prayers[prayer].performed = true;
    await prayerRecord.save();

    return NextResponse.json({ message: `${prayer} marked as performed` }, { status: 200 });
  } catch (error) {
    console.error("Error marking qaza prayer as performed:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

  