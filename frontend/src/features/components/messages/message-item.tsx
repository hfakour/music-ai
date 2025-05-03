import { Message } from "~/features/types/message";
import "../styles/message-item.css"; // وارد کردن CSS

export default function MessageItem(props: { message: Message }) {
  // تعیین کلاس مشترک برای پیام و timestamp
  const senderClass = props.message.sender === "user" ? "user" : "bot";
  
  // تشخیص جهت متن (راست به چپ یا چپ به راست)
  const isArabicOrPersian = /[\u0600-\u06FF]/.test(props.message.content);
  const textDirection = isArabicOrPersian ? "rtl" : "ltr";

  return (
    <div class={`message-item ${senderClass}-message`}>
      <div 
        class="message-text" 
        dir={textDirection} // تعیین جهت متن
      >
        {props.message.content}
      </div>
      <hr />
      <div class={`timestamp ${senderClass}-timestamp`}>
        {new Date().toLocaleDateString('fa-ir', { weekday: 'long' })}
        <span> | </span>
        {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })}
      </div>
    </div>
  );
}
