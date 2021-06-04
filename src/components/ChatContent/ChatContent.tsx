/** @jsxImportSource @emotion/react */
import ChatContentView from "@@/ChatContent/ChatContentView";
import ChatContentInput from "@@/ChatContent/ChatContentInput";
import { chatBox } from "@@/ChatContent/ChatContentCss";
import { useRecoilState, useRecoilValue, useResetRecoilState } from "recoil";
import { useLocation, useParams } from "react-router-dom";
import { useEffect } from "react";
import { ChatList, CurrentTarget } from "@/atoms/ChatInfo";
import { getChatList } from "@/selectors/ChatInfoSelector";

export default function ChatContent() {
  let { id } = useParams<{ id: string }>();
  let [chatList, setChatList] = useRecoilState(ChatList);
  let [currentTarget, setCurrentTarget] = useRecoilState(CurrentTarget);

  let resetData = useResetRecoilState(ChatList);
  let response = useRecoilValue(getChatList);
  let location = useLocation();

  useEffect(() => {
    // @ts-ignore
    setChatList(response.data);
    // @ts-ignore
    setCurrentTarget(id);
  }, [id]);
  useEffect(() => {
    return () => {
      resetData();
    };
  }, [location.pathname]);
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
