import User from "@/models/User";
import connectDB from "@/utils/db";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export const POST = async (request) => {
  const { email, password } = await request.json();

  try {
    const formattedEmail = await email.toLowerCase();

    await connectDB();
  
    const existingUser = await User.findOne({ email: formattedEmail });
  
    if (existingUser) {
      return new NextResponse("User already exists", { status: 400 });
    }
  
    const hashedPassword = await bcrypt.hash(password, 12);
  
    const newUser = new User({
      email: formattedEmail,
      password: hashedPassword,
    })
    await newUser.save();
    return new NextResponse("user is registered", { status: 200 });
  } catch (error) {
    return new NextResponse(error, { status: 500 });
  }
}
