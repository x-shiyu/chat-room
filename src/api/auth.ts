import axios from "./http";
export function login(username: string, password: string): Promise<any> {
  return axios.post("/login", {
    username,
    password,
  });
}
export function getUserInfo(): Promise<any> {
  return axios.get("/user");
}

export function register(data: any): Promise<any> {
  return axios.post("/register", data);
}
