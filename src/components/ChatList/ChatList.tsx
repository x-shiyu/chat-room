/** @jsxImportSource @emotion/react */
import { listItem, itemActive } from "./ChatListCss";
import { useHistory, useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import { ChatPerson } from "@/atoms/ChatInfo";

export default function ChatList() {
  let { id } = useParams<{ id: string }>();
  let history = useHistory();
  let [chatPerson] = useRecoilState(ChatPerson);
  function handleClick(id: number) {
    history.push("/chat/" + id);
  }
  return (
    <>
      <ul css={listItem}>
        {chatPerson.data.map((user) => (
          <li
            key={user.id}
            css={id === user.id ? itemActive : ""}
            onClick={() => handleClick(user.id)}
          >
            {user.name}
          </li>
        ))}
      </ul>
    </>
  );
}
