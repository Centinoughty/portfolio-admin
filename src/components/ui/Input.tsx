"use client";

interface InputProps {
  label: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
}

export default function Input({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
}: InputProps) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-gray-700">{label}</label>

      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="
          w-75
          rounded-md
          bg-[#f1ede6]
          px-4
          py-2.5
          text-md
          font-mono
          text-gray-800
          placeholder:text-gray-400
          outline-none
          focus:ring-2
          focus:ring-[#025a4e]
        "
      />
    </div>
  );
}
