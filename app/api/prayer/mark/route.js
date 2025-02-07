import dbConnect from "../../../lib/dbConnect"
import Prayer from "@/models/prayer";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { userId, prayer } = await request.json();
    if (!userId || !prayer) {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }

    await dbConnect();
    
    let today = new Date();
    today.setHours(0, 0, 0, 0);

    let prayerRecord = await Prayer.findOne({ userId, date: today });
    if (!prayerRecord) {
      prayerRecord = new Prayer({ userId, date: today, prayers: {} });
    }

    if (!prayerRecord.prayers[prayer]) {
      return NextResponse.json({ error: "Invalid prayer name" }, { status: 400 });
    }
    
    prayerRecord.prayers[prayer].performed = true;
    await prayerRecord.save();
    return NextResponse.json({ message: `${prayer} marked as done` }, { status: 200 });
  } catch (error) {
    console.error("Error marking prayer:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}


