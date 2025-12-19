import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import { Message } from "@/models";
import { jwtVerify } from "jose";

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined");
}

const secret = new TextEncoder().encode(JWT_SECRET);

export async function POST(req: Request) {
  try {
    await dbConnect();

    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    await Message.create({ name, email, message });

    return NextResponse.json({ message: "Message received" }, { status: 201 });
  } catch (error) {
    console.error("POST /messages error:", error);

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  try {
    const cookie = req.headers.get("cookie") || "";
    const token = cookie
      .split("; ")
      .find((c) => c.startsWith("token="))
      ?.split("=")[1];

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await jwtVerify(token, secret);

    await dbConnect();

    const messages = await Message.find().sort({
      createdAt: -1,
    });

    return NextResponse.json(messages);
  } catch (error) {
    console.error("GET /messages error:", error);

    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}
