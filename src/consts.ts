export const BASEURL =
  process.env.NODE_ENV === "development" ? "http://localhost:8000" : "/";
export const CHANNEL = "/socket";
export const NO_AUTH_PATH = ["/test", "/login", "/register"];
