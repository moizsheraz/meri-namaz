import dbConnect from "../../lib/dbConnect";
import Prayer from "../../models/Prayer";
import User from "../../models/User";

export default async function handler(req, res) {
  if (req.method === "PATCH") {
    const { userId, prayerId, prayerDate } = req.body; 

    if (!userId || !prayerId || !prayerDate) {
      return res.status(400).json({ message: "Missing required parameters" });
    }

    await dbConnect();

    try {
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const prayer = await Prayer.findOne({
        _id: prayerId,
        userId: userId,
        date: new Date(prayerDate),
        status: 'qaza'
      });

      if (!prayer) {
        return res.status(404).json({ message: "Prayer not found or not in qaza state" });
      }

      prayer.status = 'done';
      await prayer.save();

      return res.status(200).json({ message: "Prayer marked as done", prayer });

    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Server Error", error });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
