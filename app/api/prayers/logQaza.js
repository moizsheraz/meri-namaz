import dbConnect from "../../lib/dbConnect";
import User from "../../models/User";
import { verifyToken } from "@/lib/authMiddleware";

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const userId = verifyToken(req);
    if (!userId) return res.status(401).json({ error: 'Unauthorized' });

    await dbConnect();
    
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: 'User not found' });

    await User.findByIdAndUpdate(userId, { missedPrayers: user.missedPrayers + 1 });

    res.status(200).json({ message: 'Missed prayer logged' });
  }
}
