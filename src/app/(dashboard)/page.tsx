"use client";

import { useEffect, useState } from "react";
import { bric } from "@/lib/font";

export default function Home() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetch("/api/status")
      .then((res) => res.json())
      .then(setData);
  }, []);

  return (
    <section className="p-6">
      <div
        className={`flex justify-between items-center mb-8 ${bric.className}`}
      >
        <h2 className="text-4xl font-bold">Dashboard</h2>
      </div>

      {data && data.status ? (
        <div
          className={`
          max-w-xl
          rounded-xl
          p-6
          bg-white
          border
          shadow-sm
          ${data.status === "UP" ? "border-green-200" : "border-red-200"}
        `}
        >
          <div className="flex items-center gap-3 mb-4">
            <span
              className={`
              h-3 w-3 rounded-full
              ${data.status === "UP" ? "bg-green-500" : "bg-red-500"}
            `}
            />
            <p className="text-lg font-semibold">
              {data.status === "UP" ? "Website is Online" : "Website is Down"}
            </p>
          </div>

          <div className="space-y-2 text-sm text-gray-600 font-mono">
            <p>URL: https://nadeemsiyam.com</p>
            <p>HTTP Status: {data.httpStatus ?? "N/A"}</p>
            <p>Response Time: {data.responseTime ?? "--"} ms</p>
            <p>Last Checked: {new Date(data.checkedAt).toLocaleString()}</p>
          </div>
        </div>
      ) : (
        <p className="p-6">Checking website status…</p>
      )}
    </section>
  );
}
