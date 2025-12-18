import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dbConnect from "@/lib/db";
import { User } from "@/models";

export async function POST(req: Request) {
  try {
    await dbConnect();
    const { email, password } = await req.json();

    const user = await User.findOne({ email });
    if (!user)
      return NextResponse.json({ error: "User not found" }, { status: 401 });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET!, {
      expiresIn: 43200,
    });

    const response = NextResponse.json({ message: "Login successful" });
    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 43200,
    });

    return response;
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
