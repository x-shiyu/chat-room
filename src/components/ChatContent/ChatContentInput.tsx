/** @jsxImportSource @emotion/react */
import { Button } from "antd";
import { chatInput } from "@@/ChatContent/ChatContentCss";
import useChatInput from "@/hooks/useChatInput";
import { Input } from "antd";
let { TextArea } = Input;
export default function ChatContentInput() {
  let { value, handleInputChange, handleClick } = useChatInput();
  return (
    <div css={chatInput}>
      <TextArea value={value} onChange={handleInputChange} />
      <Button type="primary" className="send" onClick={handleClick}>
        发送
      </Button>
    </div>
  );
}
