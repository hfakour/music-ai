import { createSignal, onMount } from "solid-js";
import { useChatManager } from "~/features/application/chat-manager";
import Chat from "~/features/components/chatForm/chat";
import MessageList from "~/features/components/messages/message-list";
import MenuButton from "./features/components/menu/menu";


export default function App() {
  const { messages, handleSend: baseHandleSend } = useChatManager();
  const [histories, setHistories] = createSignal<string[]>([]);
  const [messageFromBackend, setMessageFromBackend] = createSignal("");

  const addHistory = (text: string) => {
    setHistories([...histories(), text]);
  };

  const updateHistory = (index: number, newText: string) => {
    const shortenedText = newText.length > 30 ? newText.slice(0, 30) : newText;
    const updated = [...histories()];
    updated[index] = shortenedText;
    setHistories(updated);
  };

  const handleSend = (message: string) => {
    baseHandleSend(message);
    if (histories().length === 0) {
      const words = message.split(" ");
      const title = words.slice(0, 5).join(" ") + (words.length > 5 ? "..." : "");
      addHistory(title);
    }
  };

  // گرفتن پیام از بک‌اند در اولین بار
  onMount(async () => {
    try {
      const res = await fetch("/api/");
      const data = await res.json();
      setMessageFromBackend(data.message);
    } catch (err) {
      console.error("خطا در اتصال به بک‌اند:", err);
      setMessageFromBackend("اتصال به بک‌اند ناموفق بود.");
    }
  });
  

  return (
    <>
      <div style={{ padding: "1rem", color: "green", "font-weight": "bold" }}>
        پیام از بک‌اند: {messageFromBackend()}
      </div>
      <MenuButton
        addHistory={addHistory}
        histories={histories()}
        updateHistory={updateHistory}
      />
      <MessageList messages={messages()} />
      <Chat onSend={handleSend} />
    </>
  );
}
