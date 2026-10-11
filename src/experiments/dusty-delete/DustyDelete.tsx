"use client";

import { useEffect, useState } from "react";
import { messages } from "./data";
import Phone from "./components/Phone";
import Message from "./components/Message";
import MessageMenu from "./components/MessageMenu";

export default function DustyDelete() {
  const [selected, setSelected] = useState<number | null>(null);

  useEffect(() => {
    const close = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelected(null);
    };

    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center bg-white p-6">
      <Phone>
        <div className="absolute inset-0 flex flex-col justify-end gap-1 px-3 pb-1">
          {messages.map((message) => (
            <Message
              key={message.id}
              {...message}
              onSelect={() => setSelected(message.id)}
            />
          ))}
        </div>

        <MessageMenu
          open={selected !== null}
          onClose={() => setSelected(null)}
        />
      </Phone>
    </div>
  );
}