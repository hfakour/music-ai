import { useChatManager } from "~/features/application/chat-manager";
import Chat from "~/features/components/chatForm/chat";
import MessageList from "~/features/components/messages/message-list";
import MenuButton from "./features/components/menu/menu";
import { createSignal } from "solid-js";
import UserButton from "./features/components/user-button/user-button";

export default function App() {
  const { messages, handleSend: baseHandleSend } = useChatManager();
  const [histories, setHistories] = createSignal<string[]>([]);

  const addHistory = (text: string) => {
    setHistories([...histories(), text]);
  };

  const updateHistory = (index: number, newText: string) => {
    // اگر طول متن جدید از 20 کاراکتر بیشتر بود، کوتاهش کن
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

  return (
    <>
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
