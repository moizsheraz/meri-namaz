import dbConnect from "../../lib/dbConnect";
import User from "../../models/User";
import { verifyToken } from "@/lib/authMiddleware";

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const userId = verifyToken(req);
    if (!userId) return res.status(401).json({ error: 'Unauthorized' });

    const { progress } = req.body;

    await dbConnect();
    
    await User.findByIdAndUpdate(userId, { prayerProgress: progress });

    res.status(200).json({ message: 'Progress updated successfully' });
  }
}
