import { Pin, Pencil, Send, Trash2 } from "lucide-react";

export const messages = [
  { id: 1, text: "Are you free this weekend? I found this new place and thought we could check it out.", time: "2:15 PM", mine: false },
  { id: 2, text: "I think so. What's up?", time: "2:16 PM", mine: true },
];

export const actions = [
  { label: "Pin message", icon: Pin, color: "text-[#29A9F5]" },
  { label: "Edit", icon: Pencil, color: "text-[#FF9B21]" },
  { label: "Forward", icon: Send, color: "text-[#16C784]" },
  { label: "Delete", icon: Trash2, color: "text-[#FF344B]" },
];