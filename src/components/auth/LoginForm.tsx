"use client";

import { bric } from "@/lib/font";
import { FormEvent, useState } from "react";
import Input from "../ui/Input";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const router = useRouter();

  const [email, setEmail] = useState<string>("");
  const [password, setPassoword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    if (loading) return;
    setLoading(true);

    try {
      await axios.post("/api/auth/login", { email, password });
      console.log(email, password);

      setEmail("");
      setPassoword("");

      router.push("/");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="w-110 p-6 bg-white/50 flex flex-col gap-4 rounded-md shadow-md"
      >
        <h2 className={`${bric.className} font-bold text-2xl`}>Login</h2>
        <Input
          label="Email"
          placeholder="test@example.com"
          value={email}
          onChange={setEmail}
        />
        <Input
          label="Password"
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={setPassoword}
        />
        <button
          type="submit"
          className={`p-2 w-full bg-(--primary-color) hover:bg-(--primary-color)/90 cursor-pointer duration-300 text-(--accent) ${bric.className} rounded-md`}
        >
          Submit
        </button>
      </form>
    </>
  );
}
