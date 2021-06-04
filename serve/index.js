const Koa = require("koa");
const { Server } = require("socket.io");
const app = new Koa();
const http = require("http").createServer(app.callback());
const router = require("./router");
const ioHandler = require("./socket-io");

let io = new Server(http, {
  path: "/socket",
  cors: {
    origin: true,
    credentials: true,
  },
});

let connect_num = 0;
io.on("connection", (socket) => {
  console.log("connect num:" + ++connect_num);
  ioHandler(socket);
});

app.use(async (ctx, next) => {
  ctx.set("Access-Control-Allow-Origin", "*");
  ctx.set("Access-Control-Allow-Credentials", true);
  await next();
});
app.use(router.routes()).use(router.allowedMethods());

http.listen("8000", () => {
  console.log("listen in 8000");
});
