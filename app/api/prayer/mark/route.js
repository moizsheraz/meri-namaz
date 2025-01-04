import dbConnect from "../../lib/dbConnect";
import Prayer from "../../models/Prayer";
import User from "../../models/User";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { userId, prayerName, status, prayerDate } = req.body;

    await dbConnect();

    try {
      // Check if the user exists
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // Check if the prayer for the given date exists
      const prayer = await Prayer.findOne({ date: new Date(prayerDate), prayer: prayerName });

      if (!prayer) {
        return res.status(404).json({ message: "Prayer not found for this date" });
      }

      // Update prayer status
      prayer.status = status;
      await prayer.save();

      // Handle qaza logic: if prayer is missed, and next prayer time has arrived
      const nextPrayerName = getNextPrayer(prayerName);
      const nextPrayer = await Prayer.findOne({ date: new Date(prayerDate), prayer: nextPrayerName });

      if (nextPrayer && nextPrayer.status === 'pending' && status === 'done') {
        // Move previous prayer to qaza if not marked before next prayer time
        const missedPrayers = await Prayer.updateOne(
          { date: new Date(prayerDate), prayer: prayerName, status: 'pending' },
          { status: 'qaza' }
        );
      }

      return res.status(200).json({ message: "Prayer marked successfully", prayer });

    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Server Error", error });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}

function getNextPrayer(currentPrayer) {
  const prayersOrder = ['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'];
  const currentIndex = prayersOrder.indexOf(currentPrayer);
  return prayersOrder[(currentIndex + 1) % prayersOrder.length];  // Loop to the first prayer after Isha
}
