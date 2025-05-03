import { createSignal } from "solid-js";
import { simulateServerResponse } from "../../shared/services/server-response";
import { Message } from "../types/message";

export function useChatManager() {
  const [messages, setMessages] = createSignal<Message[]>([]);

  const handleSend = (message: string) => {
    setMessages((prev) => [
      ...prev,
      { content: message, sender: "user" }
    ]);
    simulateServerResponse(setMessages);
  };

  return { messages, handleSend };
}
