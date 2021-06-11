/** @jsxImportSource @emotion/react */
import { Redirect, Route, Switch } from "react-router-dom";
import { createContext, lazy } from "react";
import MenuList from "@@/MenuList/MenuList";
import {
  layoutBox,
  layoutNav,
  layoutMain,
} from "@/layout/BaseLayout/BaseLayoutCss";
import { Socket } from "socket.io-client";

const ChatBox = lazy(() => import("@/views/ChatBox/ChatBox"));
const ContactBox = lazy(() => import("@/views/ContactBox/ContactBox"));
const NoFound = lazy(() => import("@/views/NoFound/NoFound"));

export const SocketContext =
  createContext<
    | {
        sockets: Map<number, Socket>;
        addSocket: (id: number, socket: Socket) => void;
      }
    | undefined
  >(undefined);

export default function BaseLayout() {
  return (
    <SocketContext.Provider
      value={{
        sockets: new Map(),
        addSocket(id, socket) {
          this.sockets.set(id, socket);
        },
      }}
    >
      <div css={layoutBox}>
        <nav css={layoutNav}>
          <MenuList></MenuList>
        </nav>
        <main css={layoutMain}>
          <Switch>
            <Redirect from="/" exact to="/chat" />
            <Route path="/chat">
              <ChatBox></ChatBox>
            </Route>
            <Route path="/contact">
              <ContactBox />
            </Route>
            <Route path="*">
              <NoFound />
            </Route>
          </Switch>
        </main>
      </div>
    </SocketContext.Provider>
  );
}
