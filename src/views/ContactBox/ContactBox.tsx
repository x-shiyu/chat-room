/** @jsxImportSource @emotion/react */
import { useRecoilState } from "recoil";
import { AtomActiveContact } from "@/atoms/AuthStatus";
import { Fragment, Suspense } from "react";
import { mainStyle, menuStyle } from "@/views/ChatBox/ChatBoxCss";
import ContactList from "@@/ContactList";
import { Route } from "react-router-dom";
import ChatContent from "@@/ChatContent/ChatContent";
import ContactContent from "@@/ContactContent";
export default function ContactBox() {
  console.log("-------------ContactBox--------------");

  let [activeContactId] = useRecoilState(AtomActiveContact);
  return (
    <Fragment>
      <div css={menuStyle}>
        <ContactList />
      </div>
      <Route
        path="/contact"
        render={({ location }) => {
          return activeContactId !== -1 ? (
            <div css={mainStyle}>
              <Suspense fallback={<h1>loading...</h1>}>
                <ContactContent />
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
