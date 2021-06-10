/** @jsxImportSource @emotion/react */
import { msgLeft, msgRight, msgBox } from "./ChatContentCss";
import useChatContent from "@/hooks/useChatContent";
export default function ChatContentView() {
  let { chatList, userInfo, ref } = useChatContent();
  return (
    <ul css={msgBox} ref={ref}>
      {chatList?.map((item, index) => (
        <li
          key={item.id}
          css={item.userId === userInfo.id ? msgLeft : msgRight}
        >
          <span>{item.name}</span>
          <p>{item.msg}</p>
        </li>
      ))}
    </ul>
  );
}
