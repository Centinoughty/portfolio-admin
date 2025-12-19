"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { bric } from "@/lib/font";

export default function MessagesPage() {
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchMessages = async () => {
    try {
      const res = await axios.get("/api/message");
      setMessages(res.data);
    } catch (err) {
      console.error("Failed to fetch messages", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  return (
    <section className="p-6">
      <div
        className={`flex justify-between items-center mb-8 ${bric.className}`}
      >
        <h2 className="text-4xl font-bold">Messages</h2>
      </div>

      {loading ? (
        <p className="text-sm text-(--secondary-color)">Loading messages…</p>
      ) : messages.length === 0 ? (
        <div className="bg-white rounded-xl border border-secondary/10 p-6 text-center">
          <p className="text-sm text-(--secondary-color)">No messages yet.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {messages.map((msg) => (
            <div
              key={msg._id}
              className="bg-white p-5 rounded-xl border border-secondary/10 shadow-sm"
            >
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-bold text-lg">{msg.name}</h3>
                  <p className="text-xs text-(--secondary-color)/70">
                    {msg.email}
                  </p>
                </div>

                <span className="text-xs text-(--secondary-color)/60">
                  {new Date(msg.createdAt).toLocaleString()}
                </span>
              </div>

              <p className="text-sm text-gray-700 whitespace-pre-wrap">
                {msg.message}
              </p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
