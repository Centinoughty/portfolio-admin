import dbConnect from "@/lib/db";
import { User } from "@/models";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
dotenv.config({ path: ".env" });

async function seed() {
  await dbConnect();
  const hashedPassword = await bcrypt.hash(process.env.PJ_PASSWORD!, 10);
  await User.create({
    name: process.env.PJ_NAME!,
    email: process.env.PJ_USERNAME!,
    password: hashedPassword,
  });
  console.log("Admin user created!");
}

seed();
