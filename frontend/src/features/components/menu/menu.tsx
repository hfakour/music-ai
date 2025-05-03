import { createSignal } from "solid-js";
import "../styles/menu.css";
import History from "../history/history";
import NewChat from "../new-chat/new-chat";
import UserButton from "../user-button/user-button";
import SearchButton from "~/features/components/search-button/search-button";

export default function MenuButton(props: {
  addHistory: (text: string) => void;
  histories: string[];
  updateHistory: (index: number, newText: string) => void;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = createSignal(false);
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen());

  return (
    <>
      <UserButton />
      {!isSidebarOpen() && (
        <>
          <button class="menu-button" onClick={toggleSidebar}>
            <svg xmlns="http://www.w3.org/2000/svg" height="30" viewBox="0 -960 960 960" width="30" fill="#e3e3e3">
              <path d="M500-640v320l160-160-160-160ZM200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm120-80v-560H200v560h120Zm80 0h360v-560H400v560Zm-80 0H200h120Z" />
            </svg>
          </button>
          <NewChat />
        </>
      )}
      {isSidebarOpen() && (
        <div class="sidebar">
          <button class="menu-button inside" onClick={toggleSidebar}>
            <svg xmlns="http://www.w3.org/2000/svg" height="30" viewBox="0 -960 960 960" width="30" fill="#e3e3e3">
              <path d="M660-320v-320L500-480l160 160ZM200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm120-80v-560H200v560h120Zm80 0h360v-560H400v560Zm-80 0H200h120Z" />
            </svg>
          </button>
          
          <SearchButton />
          <NewChat />
          <History histories={props.histories} updateHistory={props.updateHistory} />
        </div>
      )}
    </>
  );
}
