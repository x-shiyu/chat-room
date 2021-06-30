/** @jsxImportSource @emotion/react */
import { listItem, itemActive } from "./ChatListCss";
import { useRecoilState } from "recoil";
import { AtomChatRoom } from "@/atoms/ChatInfo";
import { AtomActiveRoomId } from "@/atoms/AuthStatus";
export default function ChatList() {
  console.log("-------------ChatList--------------");

  let [activeRoomId, setActiveRoomId] = useRecoilState(AtomActiveRoomId);
  let [chatRoom] = useRecoilState(AtomChatRoom);

  function handleClick(id: number) {
    setActiveRoomId(id);
  }

  return (
    <>
      <ul css={listItem}>
        {chatRoom.map((room) => (
          <li
            key={room.room_id}
            css={activeRoomId === room.room_id ? itemActive : ""}
            onClick={() => handleClick(room.room_id)}
          >
            {room.persons.map((item) => item.name).join("-")}
          </li>
        ))}
      </ul>
    </>
  );
}
