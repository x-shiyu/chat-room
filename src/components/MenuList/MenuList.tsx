/** @jsxImportSource @emotion/react */
import { Link } from "react-router-dom";
import { listItem, userBox } from "./MenuListCss";
import { AtomUserInfo } from "@/atoms/AuthStatus";
import { useRecoilState } from "recoil";

export default function MenuList() {
  let [userInfo] = useRecoilState(AtomUserInfo);
  return (
    <>
      <h1 css={userBox}>{userInfo.name}</h1>
      <ul css={listItem}>
        <li>
          <Link to="/">信息</Link>
        </li>
        <li>
          <Link to="/contact">联系人</Link>
        </li>
      </ul>
    </>
  );
}
