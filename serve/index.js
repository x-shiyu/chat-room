const Koa = require("koa");
const { Server } = require("socket.io");
const koaBody = require("koa-body");
const { handleRoom, handleContact } = require("./socket-io");
const getRouter = require("./router");
const headerSet = require("./middlewares/headerSet");
const tokenCheck = require("./middlewares/tokenCheck");
const checkSocketToken = require("./middlewares/checkSocketToken");
const SocketTokenCheck = require("./middlewares/SocketTokenCheck");
const { verify } = require("./utils/token");

const app = new Koa();
const http = require("http").createServer(app.callback());

const io = new Server(http, {
  cors: {
    origin: true,
    credentials: true,
  },
});

let normalIo = io
  .on("connection", async (socket) => {
    let { handshake } = socket;
    let { auth } = handshake;
    let { name, id } = await verify(auth.token);
    console.log("上线:" + name);
    socket.join("user_" + id);
  })
  .use(SocketTokenCheck);

let roomIo = io
  .of(/^\/socket\/room\/(\d+)$/)
  .on("connection", (socket) => {
    handleRoom(socket);
  })
  .use(checkSocketToken);

const router = getRouter({
  roomIo,
  normalIo,
});

router.get("/test", async (ctx) => {
  ctx.body = {
    name: "test",
    age: 12,
    sex: 122,
    ...ctx.query,
  };
  return;
});
//设置响应头
app.use(headerSet);
app.use(async (ctx, next) => {
  if (ctx.req.method === "OPTIONS") {
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
