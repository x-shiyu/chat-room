export function getToken() {
  let tokenStr = localStorage.getItem("token");
  if (tokenStr) {
    let [token, expire] = (tokenStr as string).split("/");
    return token && expire && Date.now() < Number(expire)
      ? token
      : setToken("");
  } else {
    return "";
  }
}

export function setToken(token: string) {
  return localStorage.setItem("token", token);
}
