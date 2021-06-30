/** @jsxImportSource @emotion/react */
import { listItem, itemActive } from "./ContactListCss";
import { useRecoilState } from "recoil";
import { AtomContacts } from "@/atoms/ChatInfo";
import { AtomActiveContact } from "@/atoms/AuthStatus";
export default function ChatList() {
  console.log("-------------ChatList--------------");

  let [activeContactId, setActiveContact] = useRecoilState(AtomActiveContact);
  let [contacts] = useRecoilState(AtomContacts);

  function handleClick(id: number) {
    setActiveContact(id);
  }

  return (
    <>
      <ul css={listItem}>
        {contacts.map((user) => (
          <li
            key={user.id}
            css={activeContactId === user.id ? itemActive : ""}
            onClick={() => handleClick(user.id)}
          >
            {user.name}
          </li>
        ))}
      </ul>
    </>
  );
}
