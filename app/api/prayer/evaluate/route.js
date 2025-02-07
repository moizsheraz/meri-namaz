import dbConnect from "../../../lib/dbConnect"
import Prayer from "@/models/prayer";
import { NextResponse } from "next/server";
export async function PUT() {
  try {
    await dbConnect();
    let today = new Date();
    today.setHours(0, 0, 0, 0);

    const prayers = ["fajr", "dhuhr", "asr", "maghrib", "isha"];
    const prayerRecords = await Prayer.find({ date: today });
    
    for (const record of prayerRecords) {
      for (const prayer of prayers) {
        if (!record.prayers[prayer].performed) {
          record.prayers[prayer].qaza = true;
        }
      }
      await record.save();
    }

    return NextResponse.json({ message: "Qaza prayers updated for all users" }, { status: 200 });
  } catch (error) {
    console.error("Error updating qaza prayers:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}