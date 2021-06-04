/** @jsxImportSource @emotion/react */
import { Fragment, Suspense } from "react";
import { menuStyle, mainStyle } from "./ChatBoxCss";
import ChatList from "@@/ChatList/ChatList";
import ChatContent from "@@/ChatContent/ChatContent";
import { Route } from "react-router-dom";

export default function ChatBox(args: any) {
  return (
    <Fragment>
      <div css={menuStyle}>
        <ChatList />
      </div>
      <Route path="/chat/:id">
        <div css={mainStyle}>
          <Suspense fallback={<h1>loading...</h1>}>
            <ChatContent />
          </Suspense>
        </div>
      </Route>
    </Fragment>
  );
}
