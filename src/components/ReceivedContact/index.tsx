/** @jsxImportSource @emotion/react */
import { useRecoilState } from "recoil";
import { AtomNewContactReq } from "@/atoms/AuthStatus";
import { Button, Modal, List, Row, Col } from "antd";
import { useEffect, useState } from "react";
import { acceptContact } from "@/api/chat";
import { AtomContacts } from "@/atoms/ChatInfo";
import { AtomNewNotice } from "@/atoms/Notice";
import { saveNoticeViewTime } from "@/utils";
import { stateSplice } from "@/utils";

function getTime(time: string) {
  return new Date(time).getTime();
}
export default function ReceivedContact() {
  console.log("-------------ReceivedContact--------------");

  let [received, setNContactReq] = useRecoilState(AtomNewContactReq);
  let [contacts, setContacts] = useRecoilState(AtomContacts);
  let [newNotice, setNewNotice] = useRecoilState(AtomNewNotice);
  const [visible, setVisible] = useState(false);

  function showModel() {
    setVisible(true);
    setNewNotice({
      latest_view_contact: Date.now(),
      latest_view_room: newNotice.latest_view_room,
    });
    saveNoticeViewTime({
      latest_view_contact: Date.now(),
      latest_view_room: newNotice.latest_view_room,
    });
  }
  function handleClick(from: number, id: number) {
    return () => {
      acceptContact(from, id).then((response: any) => {
        if (response.code === 200) {
          setContacts([...contacts, response.data]);
          let reqCopy = stateSplice(
            received,
            (item) => {
              return item.from === from;
            },
            {
              accept: 1,
            }
          );
          setNContactReq(reqCopy);
        }
      });
    };
  }
  return (
    <>
      <Button size="small" onClick={showModel}>
        新联系人
        <span>
          {
            received.filter(
              (item) => getTime(item.created_at) > newNotice.latest_view_contact
            ).length
          }
        </span>
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
            <Row style={{ marginTop: "" }}>
              <Col span={10}>
                {" "}
                {item.name}
                {item.remark ? "------>" : ""}
                {item.remark}
              </Col>
              <Col span={4} offset={10}>
                {" "}
                <Button
                  disabled={item.accept === 1}
                  size="small"
                  type="primary"
                  onClick={handleClick(item.from, item.id)}
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
