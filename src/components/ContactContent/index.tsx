/** @jsxImportSource @emotion/react */
import { useRecoilValue, useRecoilState } from "recoil";
import { getUserInfo } from "@/selectors/UserInfoSelector";
import { AtomActiveContact, AtomActiveRoomId } from "@/atoms/AuthStatus";
import { Button } from "antd";
import { box } from "./ContactContentCss";
import { linkContact } from "@/api/chat";
import { useHistory } from "react-router-dom";
import { AtomChatRoom } from "@/atoms/ChatInfo";

export default function ContactContent() {
  console.log("-------------ContactContent--------------");

  let [activeContactId] = useRecoilState(AtomActiveContact);
  let userInfo = useRecoilValue(getUserInfo(activeContactId));
  let [rooms, setRooms] = useRecoilState(AtomChatRoom);
  let [_, setActiveRoom] = useRecoilState(AtomActiveRoomId);
  let history = useHistory();

  function handleClick(contactId: number) {
    linkContact(contactId).then((data) => {
      let roomIndex = rooms.findIndex((item) => item.room_id === data.room_id);
      if (roomIndex === -1) {
        setRooms([...rooms, data]);
      }
      setActiveRoom(data.room_id);
      history.push("/chat");
    });
  }

  return (
    <div css={box}>
      <p>{userInfo.name}</p>
      <p>{userInfo.desc}</p>
      <div>
        <Button type="primary" onClick={() => handleClick(activeContactId)}>
          发消息
        </Button>
      </div>
    </div>
  );
}
