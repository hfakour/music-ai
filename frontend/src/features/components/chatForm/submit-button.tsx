import { Component } from "solid-js";

const SubmitButton: Component<{ onClick: () => void }> = (props) => {
  return (
    <button type="button" class="send-button" onClick={props.onClick}>
      <svg xmlns="http://www.w3.org/2000/svg" class="send-icon" viewBox="0 0 24 24">
        <path fill="#303344" d="M2 21l21-9L2 3v7l15 2-15 2v7z" />
      </svg>
    </button>
  );
};

export default SubmitButton;