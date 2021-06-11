const Koa = require("koa");
const { Server } = require("socket.io");
const koaBody = require("koa-body");
const ioHandler = require("./socket-io");
const router = require("./router");
const headerSet = require("./middlewares/headerSet");
const tokenCheck = require("./middlewares/tokenCheck");
const checkSocketToken = require("./middlewares/checkSocketToken");
const app = new Koa();
const http = require("http").createServer(app.callback());

let io = new Server(http, {
  cors: {
    origin: true,
    credentials: true,
  },
});
let connect_num = 0;

const msgAddIO = io.of(/^\/socket\/room\/(\d+)$/).on("connection", (socket) => {
  ioHandler(socket);
});
msgAddIO.use(checkSocketToken);

//设置响应头
app.use(headerSet);
app.use(async (ctx, next) => {
  if (ctx.req.method == "OPTIONS") {
    ctx.status = 200;
  } else {
    await next();
  }
});
//验证token
app.use(tokenCheck);

//解析body
app.use(koaBody());

app.use(router.routes()).use(router.allowedMethods());

http.listen("8000", () => {
  console.log("listen in 8000");
});
