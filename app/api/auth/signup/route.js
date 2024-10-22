import dbConnect from "../../../lib/dbConnect";
import User from "../../../models/User";
import bcrypt from 'bcryptjs';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, email, password } = req.body;

    await dbConnect();

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = await User.create({ name, email, password: hashedPassword });

    return res.status(201).json({ message: 'User created', userId: newUser._id });
  }
}
