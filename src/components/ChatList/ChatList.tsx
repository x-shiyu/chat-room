/** @jsxImportSource @emotion/react */
import { listItem, itemActive } from "./ChatListCss";
import { useHistory, useParams } from "react-router-dom";

const userInfo = [
  {
    name: "张三",
    id: 1,
  },
  {
    name: "李四",
    id: 2,
  },
  {
    name: "王五",
    id: 4,
  },
];

export default function ChatList() {
  let { id } = useParams<{ id: string }>();
  let history = useHistory();
  function handleClick(id: number) {
    history.push("/chat/" + id);
  }
  return (
    <>
      <ul css={listItem}>
        {userInfo.map((user) => (
          <li
            key={user.id}
            css={Number(id) === user.id ? itemActive : ""}
            onClick={() => handleClick(user.id)}
          >
            {user.name}
          </li>
        ))}
      </ul>
    </>
  );
}
