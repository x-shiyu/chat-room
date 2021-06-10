import axios from "./http";
export function getContacts(): Promise<any> {
  return axios.get("/contacts");
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
