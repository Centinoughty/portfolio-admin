import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import { Skill } from "@/models";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

async function isAdmin() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  return !!(token && jwt.verify(token, process.env.JWT_SECRET!));
}

export async function GET() {
  await dbConnect();
  const skill = await Skill.find({}).sort({ startDate: -1 });
  return NextResponse.json(skill);
}

export async function POST(req: Request) {
  if (!(await isAdmin()))
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  await dbConnect();
  const data = await req.json();
  const skill = await Skill.create(data);
  return NextResponse.json(skill);
}

export async function PUT(req: Request) {
  if (!(await isAdmin()))
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  await dbConnect();
  const { id, ...data } = await req.json();
  const skill = await Skill.findByIdAndUpdate(id, data, {
    new: true,
  });
  return NextResponse.json(skill);
}

export async function DELETE(req: Request) {
  if (!(await isAdmin()))
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { searchParams } = new URL(req.url);
  await dbConnect();
  await Skill.findByIdAndDelete(searchParams.get("id"));
  return NextResponse.json({ message: "Deleted" });
}
