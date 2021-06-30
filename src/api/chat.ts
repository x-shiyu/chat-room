import axios from "./http";
export function getContacts(): Promise<any> {
  return axios.get("/contacts");
}
export function addContacts(email: string, remark: string): Promise<any> {
  return axios.post("/contacts", {
    email,
    remark,
  });
}
export function getReceivedContacts(): Promise<any> {
  return axios.get("/contacts/new");
}

export function linkContact(to: number): Promise<any> {
  return axios.post("/room", {
    contactId: [to],
  });
}

export function getRoomInfoById(roomId: number): Promise<any> {
  return axios.get("/room/" + roomId);
}
export function getRoomInfoByContactId(userId: string): Promise<any> {
  return axios.get("/user/room/" + userId);
}

export function getAllRoomList(): Promise<any> {
  return axios.get("/rooms");
}
export function sendMsg(roomId: number, msg: string): Promise<any> {
  return axios.put(`/room/${roomId}`, {
    msg,
  });
}

export function acceptContact(from: number, id: number): Promise<any> {
  return axios.post("/contacts/accept", {
    id,
    from,
  });
}
