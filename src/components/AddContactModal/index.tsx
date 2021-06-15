/** @jsxImportSource @emotion/react */
import { Input, Modal } from "antd";
import { remarkBox } from "@@/MenuList/MenuListCss";
import { useState } from "react";
import { AtomSockets } from "@/atoms/Sockets";
import { useRecoilState } from "recoil";

const { TextArea } = Input;

interface AddContactModalProps {
  visible: boolean;
  setVisible: (value: boolean) => void;
}
export default function AddContactModal({
  visible,
  setVisible,
}: AddContactModalProps) {
  let [remark, setRemark] = useState("");
  let [email, setEmail] = useState("");
  let [sockets] = useRecoilState(AtomSockets);
  function addContact() {
    sockets.get("contacts")?.emit("add_contact", {
      email,
      remark,
    });
    setEmail("");
    setRemark("");
    setVisible(false);
  }
  function handleCancel() {
    setEmail("");
    setRemark("");
    setVisible(false);
  }
  return (
    <Modal
      title="  "
      visible={visible}
      onOk={addContact}
      onCancel={handleCancel}
      cancelText="取消"
      okText="确定"
    >
      <Input
        placeholder="请输入联系人邮箱"
        value={email}
        type="email"
        onChange={(ev) => setEmail(ev.target.value)}
      ></Input>

      <div css={remarkBox}>
        <p>备注：</p>
        <TextArea
          value={remark}
          onChange={(ev) => setRemark(ev.target.value)}
        ></TextArea>
      </div>
    </Modal>
  );
}
