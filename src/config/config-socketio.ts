import { ManagerOptions } from "socket.io-client";
import { getToken } from "@/utils/storage";
interface IO extends Partial<ManagerOptions> {
  auth?: any;
}
export const Options: IO = {
  path: "/socket",
  auth: {
    token: getToken(),
  },
  reconnectionAttempts: 5,
};
