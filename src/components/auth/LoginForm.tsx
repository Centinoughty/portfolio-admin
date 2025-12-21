"use client";

import { bric } from "@/lib/font";
import { FormEvent, useState } from "react";
import Input from "../ui/Input";
import axios from "axios";
import { useRouter } from "next/navigation";
import { FiXCircle } from "react-icons/fi";

export default function LoginForm() {
  const router = useRouter();

  const [email, setEmail] = useState<string>("");
  const [password, setPassoword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const [toast, setToast] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(true);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    if (loading) return;
    setLoading(true);

    try {
      await axios.post("/api/auth/login", { email, password });

      setSuccess(true);
      router.push("/");
    } catch (error) {
      setSuccess(false);
      setToast("Incorrect credentials. Try again...");
      setTimeout(() => setToast(null), 4000);
      console.log(error);
    } finally {
      setEmail("");
      setPassoword("");

      setLoading(false);
    }
  }

  return (
    <>
      {toast && (
        <div className="z-50 fixed top-6 right-6 bg-[#E6F2EE] text-(--primary-color) px-4 py-2 rounded-md shadow-2xl animate-fade-in">
          <p
            className={`${bric.className} font-semibold text-lg flex justify-center items-center gap-2`}
          >
            {!success && (
              <FiXCircle size={20} className="text-red-700 text-xl" />
            )}
            {toast}
          </p>
        </div>
      )}

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
          disabled={loading}
          className={`p-2 w-full bg-(--primary-color) hover:bg-(--primary-color)/90 disabled:bg-gray-500 cursor-pointer duration-300 text-(--accent) ${bric.className} rounded-md`}
        >
          {loading ? "Logging in..." : "Submit"}
        </button>
      </form>
    </>
  );
}
