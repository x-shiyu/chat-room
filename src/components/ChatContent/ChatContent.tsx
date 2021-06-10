/** @jsxImportSource @emotion/react */
import ChatContentView from "@@/ChatContent/ChatContentView";
import ChatContentInput from "@@/ChatContent/ChatContentInput";
import { chatBox } from "@@/ChatContent/ChatContentCss";
export default function ChatContent() {
  return (
    <section css={chatBox}>
      <div className="content-box">
        <ChatContentView />
      </div>
      <div className="input-box">
        <ChatContentInput />
      </div>
    </section>
  );
}
