/** @jsxImportSource @emotion/react */
import { Fragment, Suspense } from "react";
import { menuStyle, mainStyle } from "./ChatBoxCss";
import ChatList from "@@/ChatList/ChatList";
import ChatContent from "@@/ChatContent/ChatContent";
import { Route } from "react-router-dom";
import { useRecoilState } from "recoil";
import { AtomActiveRoomId } from "@/atoms/AuthStatus";

export default function ChatBox(args: any) {
  let [activeRoomId] = useRecoilState(AtomActiveRoomId);
  return (
    <Fragment>
      <div css={menuStyle}>
        <ChatList />
      </div>
      <Route
        path="/chat"
        render={({ location }) => {
          return activeRoomId !== -1 ? (
            <div css={mainStyle}>
              <Suspense fallback={<h1>loading...</h1>}>
                <ChatContent />
              </Suspense>
            </div>
          ) : (
            ""
          );
        }}
      ></Route>
    </Fragment>
  );
}
