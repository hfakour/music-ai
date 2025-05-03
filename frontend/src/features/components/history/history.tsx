import { For, createSignal } from "solid-js";
import "../styles/history.css";

const isPersian = (text: string) => /[\u0600-\u06FF]/.test(text);

export default function History(props: {
  histories: string[];
  updateHistory: (index: number, newText: string) => void;
}) {
  const [editingIndex, setEditingIndex] = createSignal<number | null>(null);
  const [editText, setEditText] = createSignal("");

  const startEdit = (index: number, currentText: string) => {
    setEditingIndex(index);
    setEditText(currentText);
  };

  const finishEdit = (index: number) => {
    // اگر طول متن ویرایش شده بیشتر از 20 کاراکتر بود، آن را کوتاه کن
    const updatedText = editText().length > 30 ? editText().slice(0, 30) : editText().trim();
    props.updateHistory(index, updatedText);
    setEditingIndex(null);
  };

  return (
    <div class="history-container">
      <h2 class="history-title">تاریخچه چت‌</h2>
      <div class="history-list">
        <For each={props.histories}>
          {(item, index) => {
            const isEditing = () => editingIndex() === index();
            const persian = isPersian(item);
            return (
              <div class={`history-item ${persian ? "rtl-text" : "ltr-text"}`} >
                {isEditing() ? (
                  <input
                    class="edit-input"
                    type="text"
                    value={editText()}
                    onInput={(e) => setEditText(e.currentTarget.value)}
                    onBlur={() => finishEdit(index())}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") finishEdit(index());
                    }}
                    autofocus
                  />
                ) : (
                  <>
                    <span class="history-text">{item}</span>
                    <button
                      class="edit-button"
                      onClick={() => startEdit(index(), item)}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 -960 960 960" width="20" fill="#e3e3e3">
                        <path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Z" />
                      </svg>
                    </button>
                  </>
                )}
              </div>
            );
          }}
        </For>
      </div>
    </div>
  );
}
