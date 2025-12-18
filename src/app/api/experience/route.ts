import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import { Experience } from "@/models";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

async function isAdmin() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  return !!(token && jwt.verify(token, process.env.JWT_SECRET!));
}

export async function GET() {
  await dbConnect();
  const exp = await Experience.find({}).sort({ startDate: -1 });
  return NextResponse.json(exp);
}

export async function POST(req: Request) {
  if (!(await isAdmin()))
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  await dbConnect();
  const data = await req.json();
  const experience = await Experience.create(data);
  return NextResponse.json(experience);
}

export async function PUT(req: Request) {
  if (!(await isAdmin()))
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  await dbConnect();
  const { id, ...data } = await req.json();
  const experience = await Experience.findByIdAndUpdate(id, data, {
    new: true,
  });
  return NextResponse.json(experience);
}

export async function DELETE(req: Request) {
  if (!(await isAdmin()))
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { searchParams } = new URL(req.url);
  await dbConnect();
  await Experience.findByIdAndDelete(searchParams.get("id"));
  return NextResponse.json({ message: "Deleted" });
}
