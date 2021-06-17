const { getChatList } = require("../utils/chats");
const { v4: uuidv4 } = require("uuid");
const { Room } = require("../model");

const {
  redisLRange,
  redisLLen,
  redisRPush,
  sequelize,
} = require("../config/db");

const {
  getRoomPerson,
  getUserRoomsById,
  addRoom,
  getUserContactRoom,
} = require("../sql");

module.exports = ({ roomIo }) => {
  //获取所有的room
  const getAllRooms = {
    path: "/rooms",
    method: "GET",
    handle: async (ctx, next) => {
      let id = ctx.userId;
      let roomIds = await getUserRoomsById(id);
      let allMsg = await getRoomPerson(roomIds);
      ctx.body = allMsg;
    },
  };

  //创建room
  const createRoom = {
    path: "/room",
    method: "POST",
    handle: async (ctx, next) => {
      let roomMsg = [];
      let id = ctx.userId;
      let contactId = ctx.body.contactId;
      let roomModel = Room;
      const t = await sequelize.transaction();
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
    },
  };

  //获取某个room的信息
  const getRoomInfo = {
    path: "/room/:id",
    method: "GET",
    handle: async (ctx, next) => {
      let roomId = ctx.params["id"];
      let chatList = await getChatList("room_" + roomId);
      ctx.body = chatList.map((item) => JSON.parse(item));
    },
  };

  //房间添加信息
  const addRoomMsg = {
    path: "/room/:id",
    method: "PUT",
    handle: async (ctx, next) => {
      let roomId = ctx.params["id"];
      let userId = ctx.userId;
      let { msg } = ctx.request.body;
      let [roomInfo] = await getUserContactRoom(userId, roomId);
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
        roomIo.to("room_" + roomId).emit("receive_msg", msgInfo);
        ctx.body = {
          code: 200,
        };
      } catch (err) {
        ctx.status = 500;
      }
    },
  };

  return [getAllRooms, createRoom, addRoomMsg, getRoomInfo];
};
