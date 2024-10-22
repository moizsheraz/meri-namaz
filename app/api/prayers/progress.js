import dbConnect from "../../lib/dbConnect";
import User from "../../models/User";
import { verifyToken } from "@/lib/authMiddleware"; // Token verification helper

export default async function handler(req, res) {
  const userId = verifyToken(req);
  if (!userId) return res.status(401).json({ error: 'Unauthorized' });

  await dbConnect();

  const user = await User.findById(userId);
  if (!user) return res.status(404).json({ error: 'User not found' });

  res.status(200).json({ progress: user.prayerProgress });
}
