import { createSignal } from "solid-js";
import SubmitButton from "./submit-button";
import "../styles/chat.css"; // Import the CSS file for styling

export default function Chat(props: { onSend: (message: string) => void }) {
  const [inputValue, setInputValue] = createSignal("");
  const [moved, setMoved] = createSignal(false);
  const [showGreeting, setShowGreeting] = createSignal(true);

  const handleSubmit = () => {
    if (inputValue().trim() !== "") {
      props.onSend(inputValue());
      setInputValue("");
      setMoved(true);
      setShowGreeting(false);
    }
  };

  return (
    <>
      {showGreeting() && (
        <div class="greeting-container">
          <img
            src="https://www.edigitalagency.com.au/wp-content/uploads/chatgpt-logo-white-on-transparent-background-png.png"
            alt="ChatGPT Logo"
            class="logo"
          />
          <div class="greeting-text">چه کمکی می‌توانم بکنم؟</div>
        </div>
      )}

      <div class={`chat-container ${moved() ? "move-to-bottom" : ""}`}>
        <form class="chat-form" onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
          <input
            type="text"
            placeholder="پیام خود را بنویسید ..."
            value={inputValue()}
            onInput={(e) => setInputValue(e.currentTarget.value)}
            class="chat-input"
          />
          <SubmitButton onClick={handleSubmit} />
        </form>
      </div>
    </>
  );
}
