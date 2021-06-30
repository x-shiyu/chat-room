/** @jsxImportSource @emotion/react */
import { NavLink } from "react-router-dom";
import { listItem, userBox } from "./MenuListCss";
import { Button } from "antd";
import useMenu from "@/hooks/useMenu";
import AddContactModal from "@@/AddContactModal";
import ReceivedContact from "@@/ReceivedContact";
export default function MenuList() {
  console.log("-------------MenuList--------------");

  const navActiveStyle = {
    background: "yellow",
    color: "lightcoral",
  };

  function handleSignOut() {
    window.localStorage.setItem("token", "");
    window.location.reload();
  }
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
          <ReceivedContact />
        </li>
        <li>
          <Button type="primary" onClick={handleSignOut}>
            退出
          </Button>
        </li>
      </ul>
      <AddContactModal visible={visible} setVisible={setVisible} />
    </>
  );
}
