"use client";

import { bric } from "@/lib/font";

interface InputProps {
  label: string;
  type?: string;
  placeholder?: string;
  value: string;
  checked?: boolean;
  onChange: (value: string) => void;
  textarea?: boolean;
}

export default function Input({
  label,
  type = "text",
  placeholder,
  value,
  checked,
  onChange,
  textarea = false,
}: InputProps) {
  return (
    <div className="flex flex-col gap-2">
      <label className={`text-sm font-medium text-gray-700 ${bric.className}`}>
        {label}
      </label>

      {textarea ? (
        <textarea
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          className="font-mono bg-(--accent) rounded-md px-3 py-2 h-24 outline-none focus:ring-2 focus:ring-(--primary-color)"
        />
      ) : type === "checkbox" ? (
        <input
          type="checkbox"
          checked={checked}
          onChange={(e: any) => onChange(e.target.checked)}
          className="h-4 w-4"
        />
      ) : (
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="
          w-75
          rounded-md
          bg-(--accent)
          px-4
          py-2.5
          text-md
          font-mono
          text-gray-800
          placeholder:text-gray-400
          outline-none
          focus:ring-2
          focus:ring-(--primary-color)
        "
        />
      )}
    </div>
  );
}
