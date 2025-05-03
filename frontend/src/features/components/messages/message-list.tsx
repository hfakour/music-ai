import { For, createEffect, onCleanup } from "solid-js";
import MessageItem from "./message-item";
import "../styles/message-list.css";
import { Message } from "~/features/types/message";

export default function MessageList(props: { messages: Message[] }) {
  let messageListContainerRef: HTMLDivElement | undefined;

  // استفاده از MutationObserver برای نظارت بر تغییرات DOM
  createEffect(() => {
    if (messageListContainerRef) {
      // ایجاد MutationObserver
      const observer = new MutationObserver(() => {
        // اسکرول به پایین
        messageListContainerRef.scrollTop = messageListContainerRef.scrollHeight;
      });

      // تنظیم مشاهده تغییرات در لیست پیام‌ها
      observer.observe(messageListContainerRef, {
        childList: true,  // تغییرات فرزند
        subtree: true,    // نظارت بر زیرمجموعه‌ها
      });

      // تمیز کردن observer وقتی کامپوننت از بین می‌رود
      onCleanup(() => observer.disconnect());
    }
  });

  return (
    <div ref={messageListContainerRef} class="message-list-container">
      <div class="message-list">
        <For each={props.messages}>
          {(msg) => <MessageItem message={msg} />}
        </For>
      </div>
    </div>
  );
}
