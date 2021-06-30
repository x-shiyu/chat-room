/** @jsxImportSource @emotion/react */
import { msgLeft, msgRight, msgBox, msgItem } from "./ChatContentCss";
import useChatContent from "@/hooks/useChatContent";
import dayjs from "dayjs";

export default function ChatContentView() {
  console.log("-------------ChatContentView--------------");

  let { chatList, userInfo, ref } = useChatContent();
  return (
    <ul css={msgBox} ref={ref}>
      {chatList?.map((item, index) => (
        <li
          key={item.id}
          css={item.from_id === userInfo.id ? msgLeft : msgRight}
        >
          <span>{item.from_name}</span>
          <div css={msgItem}>
            <span>{dayjs(item.created_at).format("YYYY-MM-DD HH:mm:ss")}</span>
            <p>{item.message}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}
