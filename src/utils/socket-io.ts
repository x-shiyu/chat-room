import { io, ManagerOptions, Manager } from "socket.io-client";
import { BASEURL } from "@/consts";
import { getToken } from "@/utils/storage";
const BASE_OPTIONS = {
  reconnectionAttempts: 3,
  auth: {
    token: getToken(),
  },
};
export class IO extends Manager {
  constructor(url: string, options: Partial<ManagerOptions>) {
    super(url, options);
  }
  getSocket(nsp: string) {
    return this.socket(nsp, {
      auth: {
        token: getToken(),
      },
    });
  }
}

export function createSocket(nsp: string, options?: Partial<ManagerOptions>) {
  let cOptions = BASE_OPTIONS;
  if (options) {
    cOptions = Object.assign(cOptions, options);
  }
  return io(BASEURL + nsp, cOptions);
}

export function createRoomSocket(roomId: number, events: any) {
  let socket = createSocket("/socket/room/" + roomId);
  Object.keys(events).forEach((ev) => {
    socket.on(ev, events[ev]);
  });
  return socket;
}

export function createContactSocket(events: any) {
  let socket = createSocket("/contact");
  Object.keys(events).forEach((ev) => {
    socket.on(ev, events[ev]);
  });
  return socket;
}

export function createQuerySocket(query:any,events:any){
  let socket = createSocket("/",{
    query
  });
  Object.keys(events).forEach((ev) => {
    socket.on(ev, events[ev]);
  });
  return socket
}