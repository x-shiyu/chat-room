const Router = require("@koa/router");
const router = new Router();
const { sign } = require("../utils/token");
const { getChatList } = require("../utils/chats");
const { v4: uuidv4 } = require("uuid");

const {
  redisSet,
  redisExpire,
  redisGet,
  redisLRange,
  redisLLen,
  redisRPush,
} = require("../config/db");
const { expires } = require("../config/conts");

const {
  getContacts,
  getUserInfoById,
  getUserByNamePwd,
  getRoomPerson,
  getUserRoomsById,
  addRoom,
  getUserContactRoom,
} = require("../sql");

//用户信息
router.get("/user", async (ctx) => {
  let id = ctx.userId;
  let [data] = await getUserInfoById(id);
  ctx.body = data;
});

//联系人信息
router.get("/contacts", async (ctx) => {
  let id = ctx.userId;
  let contacts = await getContacts(id);
  ctx.body = contacts;
});

//登录
router.post("/login", async (ctx) => {
  let { username, password } = ctx.request.body;
  let [data] = await getUserByNamePwd(username, password);
  if (data.num === 1) {
    let token = sign({
      id: data.id,
      name: data.name,
      expire: Date.now() + expires,
    });
    await redisSet(data.id + data.name, token);
    await redisExpire(token, expires / 1000);
    ctx.body = {
      token,
      expire: Date.now() + expires,
    };
  } else {
    ctx.status = 403;
    ctx.body = "用户名或密码错误!";
  }
});

//获取所有的room
router.get("/rooms", async (ctx, next) => {
  let id = ctx.userId;
  let roomIds = await getUserRoomsById(id);
  let allMsg = await getRoomPerson(roomIds);
  ctx.body = allMsg;
});

//创建room
router.get("/user/room/:contactId", async (ctx, next) => {
  let roomMsg = [];
  let id = ctx.userId;
  let targetId = ctx.params.contactId;
  let [roomInfo] = await getUserContactRoom(id, targetId);
  if (roomInfo?.room_id) {
    let msgLen = await redisLLen("room_" + roomInfo.room_id);
    if (msgLen > 0) {
      roomMsg = await redisLRange("room_" + roomInfo.room_id, 0, msgLen);
    }
  } else {
    await addRoom([id, targetId]);
  }

  ctx.body = roomMsg;
});

//获取某个room的信息
router.get("/room/:id", async (ctx, next) => {
  let roomId = ctx.params["id"];
  let chatList = await getChatList("room_" + roomId);
  ctx.body = chatList.map((item) => JSON.parse(item));
});

//房间添加信息
router.put("/room/:id", async (ctx, next) => {
  let roomId = ctx.params["id"];
  let userId = ctx.userId;
  let { msg } = ctx.request.body;
  // let [roomInfo] = await getUserContactRoom(userId, roomId);
  try {
    let id = uuidv4();
    let time = Date.now();
    let msgInfo = {
      id,
      msg,
      name: ctx.userName,
      userId,
      time,
    };
    await redisRPush("room_" + roomId, JSON.stringify(msgInfo));
    ctx.body = msgInfo;
  } catch (err) {
    ctx.status = 500;
  }
});
module.exports = router;
