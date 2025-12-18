"use client";

import Link from "next/link";
import { bric } from "@/lib/font";
import { usePathname, useRouter } from "next/navigation";
import axios from "axios";

const links = [
  { href: "/", label: "Dashboard" },
  { href: "/projects", label: "Projects" },
  { href: "/experience", label: "Experience" },
  { href: "/skills", label: "Skills" },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    await axios.post("/api/auth/logout");
    router.push("/login");
    router.refresh();
  };

  return (
    <nav
      className={`h-full flex flex-col justify-between p-6 text-(--accent) bg-linear-to-b from-[#025a4e] to-[#01463d] ${bric.className}`}
    >
      <div className="space-y-6">
        <div className="space-y-1">
          <h1 className="text-xl font-bold">Admin Panel</h1>
          <Link href={"https://nadeemsiyam.com"} target="_blank">
            nadeemsiyam.com
          </Link>
        </div>

        <ul className="space-y-3">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`block rounded-md px-3 py-2 transition ${
                  pathname === link.href ? "bg-white/20" : "hover:bg-white/10"
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <button
        className="rounded-md bg-white/10 px-3 py-2 text-sm hover:bg-white/20 cursor-pointer"
        onClick={handleLogout}
      >
        Logout
      </button>
    </nav>
  );
}
