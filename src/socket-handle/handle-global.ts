interface ReceiveRequest {
  name: string;
  remark: string;
  from_id: number;
  id: number;
  created_at: string;
  accept: number;
}

export function new_contact_request(
  oContactReq: ReceiveRequest[],
  setNContactReq: any
) {
  return (data: any) => {
    let contactReqCopy = [...oContactReq];
    let sameReqIndex = contactReqCopy.findIndex(
      (item: any) => item.from === data.from
    );
    if (sameReqIndex > -1) {
      let sameInfo = contactReqCopy[sameReqIndex];
      contactReqCopy.splice(sameReqIndex, 1, {
        ...sameInfo,
        ...data,
      });
      setNContactReq(contactReqCopy);
    } else {
      if (!data.isAccept) {
        setNContactReq([...setNContactReq, data]);
      }
    }
  };
}
export function new_contact(contacts: any[], setContacts: any) {
  return (data: any) => {
    setContacts([...contacts, data]);
  };
}
