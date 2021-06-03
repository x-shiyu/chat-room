/** @jsxImportSource @emotion/react */
import { Link } from "react-router-dom";
import { listItem } from "./MenuListCss";

export default function MenuList() {
  return (
    <ul css={listItem}>
      <li>
        <Link to="/">信息</Link>
      </li>
      <li>
        <Link to="/contact">联系人</Link>
      </li>
    </ul>
  );
}
