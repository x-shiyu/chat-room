/** @jsxImportSource @emotion/react */
import { useRecoilState } from "recoil";
import { AtomReceivedContacts } from "@/atoms/AuthStatus";
import { Button, Modal, List, Row, Col } from "antd";
import { useState } from "react";
import { acceptContact } from "@/api/chat";
import { AtomContacts } from "@/atoms/ChatInfo";
export default function ChatContent() {
  let [received] = useRecoilState(AtomReceivedContacts);
  let [contacts, setContacts] = useRecoilState(AtomContacts);
  const [visible, setVisible] = useState(false);
  function handleClick(id: number) {
    return () => {
      acceptContact(id).then((response: any) => {
        if (response.code === 200) {
          setContacts([...contacts, response.data]);
        }
      });
    };
  }
  return (
    <>
      <Button size="small" onClick={() => setVisible(true)}>
        新联系人
      </Button>
      <Modal
        title="新请求"
        visible={visible}
        closable
        onCancel={() => setVisible(false)}
        footer={null}
      >
        <List
          itemLayout="horizontal"
          dataSource={received}
          renderItem={(item: any) => (
            <Row>
              <Col span={10}>
                {" "}
                {item.name}
                {item.remark ? "------" : ""}
                {item.remark}
              </Col>
              <Col span={4} offset={10}>
                {" "}
                <Button
                  size="small"
                  type="primary"
                  onClick={handleClick(item.reqId)}
                >
                  同意
                </Button>
              </Col>
            </Row>
          )}
        />
      </Modal>
    </>
  );
}
