const Koa = require("koa");
const { Server } = require("socket.io");
const koaBody = require("koa-body");
const path = require("path");
const fs = require("fs");

const { handleRoom } = require("./socket-io");
const getRouter = require("./router");
const headerSet = require("./middlewares/headerSet");
const tokenCheck = require("./middlewares/tokenCheck");
const checkSocketToken = require("./middlewares/checkSocketToken");
const SocketTokenCheck = require("./middlewares/SocketTokenCheck");
const { verify } = require("./utils/token");

const app = new Koa();
const http = require("http").createServer(app.callback());
const port = process.env.NODE__ENV === "development" ? 8000 : 80;
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

app.use(require("koa-static")(path.join(__dirname, "../build")));

const router = getRouter({
  roomIo,
  normalIo,
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
app.use(async (ctx) => {
  ctx.type = "text/html";
  ctx.body = fs.readFileSync(path.join(__dirname, "../build/index.html"));
});
http.listen(port, () => {
  console.log(`listen in ${port}`);
});
