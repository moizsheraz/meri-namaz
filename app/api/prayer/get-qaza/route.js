import dbConnect from "../../lib/dbConnect";
import Prayer from "../../models/Prayer";
import User from "../../models/User";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const { userId, prayerDate } = req.query; // userId and date of prayers

    await dbConnect();

    try {
      // Check if the user exists
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // Fetch prayers marked as 'qaza' for the given date
      const qazaPrayers = await Prayer.find({ 
        date: new Date(prayerDate),
        status: 'qaza',
        _id: { $in: user.prayers } // Only fetch prayers related to this user
      });

      if (qazaPrayers.length === 0) {
        return res.status(200).json({ message: "No qaza prayers for today." });
      }

      return res.status(200).json({ qazaPrayers });
      
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Server Error", error });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
