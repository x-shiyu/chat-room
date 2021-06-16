/** @jsxImportSource @emotion/react */
import { NavLink } from "react-router-dom";
import { listItem, userBox } from "./MenuListCss";
import { Button } from "antd";
import useMenu from "@/hooks/useMenu";
import AddContactModal from "@@/AddContactModal";
import ReceivedContact from '@@/ReceivedContact'
export default function MenuList() {
  const navActiveStyle = {
    background: "lightcoral",
    color: "yellow",
  };
  let { userInfo, setVisible, visible } = useMenu();
  return (
    <>
      <h1 css={userBox}>{userInfo.name}</h1>
      <ul css={listItem}>
        <li>
          <NavLink to="/chat" activeStyle={navActiveStyle}>
            信息
          </NavLink>
        </li>
        <li>
          <NavLink to="/contact" activeStyle={navActiveStyle}>
            联系人
          </NavLink>
        </li>
        <li>
          <Button type="primary" onClick={() => setVisible(true)}>
            添加联系人
          </Button>
        </li>
        <li>
          <ReceivedContact/>
        </li>
      </ul>
      <AddContactModal visible={visible} setVisible={setVisible} />

    </>
  );
}
