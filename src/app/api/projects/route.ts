import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import { Project } from "@/models";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

// Helper to verify admin status
async function isAdmin() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  if (!token) return false;
  try {
    jwt.verify(token, process.env.JWT_SECRET!);
    return true;
  } catch {
    return false;
  }
}

// GET: Public - Fetch all projects
export async function GET() {
  await dbConnect();
  const projects = await Project.find({}).sort({ createdAt: -1 });
  return NextResponse.json(projects);
}

// POST: Protected - Create a project
export async function POST(req: Request) {
  if (!(await isAdmin()))
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await dbConnect();
  const data = await req.json();
  const project = await Project.create(data);
  return NextResponse.json(project);
}

// PUT: Protected - Update a project
export async function PUT(req: Request) {
  if (!(await isAdmin()))
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await dbConnect();
  const { id, ...data } = await req.json();
  const project = await Project.findByIdAndUpdate(id, data, { new: true });
  return NextResponse.json(project);
}

// DELETE: Protected
export async function DELETE(req: Request) {
  if (!(await isAdmin()))
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  await dbConnect();
  await Project.findByIdAndDelete(id);
  return NextResponse.json({ message: "Deleted" });
}
