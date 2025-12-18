"use client";

import { bric } from "@/lib/font";
import { FormEvent, useState } from "react";
import Input from "../ui/Input";

export default function LoginForm() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassoword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setLoading(true);

    try {
      console.log(email, password);

      setEmail("");
      setPassoword("");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="p-6 bg-white/50 flex flex-col gap-4"
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
