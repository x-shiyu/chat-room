/** @jsxImportSource @emotion/react */
import { useRecoilValue, useRecoilState } from "recoil";
import { getUserInfo } from "@/selectors/UserInfoSelector";
import { AtomActiveContact } from "@/atoms/AuthStatus";
import { Button } from "antd";
import { box } from "./ContactContentCss";
export default function ContactContent() {
  let [activeContactId] = useRecoilState(AtomActiveContact);
  let userInfo = useRecoilValue(getUserInfo(activeContactId));
  return (
    <div css={box}>
      <p>{userInfo.name}</p>
      <p>{userInfo.desc}</p>
      <div>
        <Button type="primary">发消息</Button>
      </div>
    </div>
  );
}
