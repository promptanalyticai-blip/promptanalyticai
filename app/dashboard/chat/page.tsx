"use client";

import { useEffect, useState } from "react";
import { supabaseBrowser } from "@/lib/supabase/browser";

export default function ChatPage() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const loadMessages = async () => {
      const { data, error } = await supabaseBrowser
        .from("chat_messages")
        .select("*")
        .order("created_at", { ascending: true });

      if (!error) {
        setMessages(data);
      }
    };

    loadMessages();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold">Chat</h1>

      <div className="mt-4 flex flex-col gap-2">
        {messages.map((m) => (
          <div key={m.id} className="border p-2 rounded">
            <strong>{m.user}</strong>: {m.message}
          </div>
        ))}
      </div>
    </div>
  );
}
