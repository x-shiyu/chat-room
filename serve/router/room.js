const { Message } = require("../model");

const { getRoomPerson, getUserRoomsById } = require("../sql");

const { handleCreateRoom } = require("../service/roomHandle");

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
      let id = ctx.userId;
      let contactId = ctx.request.body.contactId;
      let result = await handleCreateRoom(id, contactId);

      ctx.body = result;
    },
  };

  //获取某个room的信息
  const getRoomInfo = {
    path: "/room/:id",
    method: "GET",
    handle: async (ctx, next) => {
      let roomId = ctx.params["id"];
      let chatList = await Message.findAll({
        where: {
          room_id: roomId,
          deleted_at: null,
        },
      });
      ctx.body = chatList.map((item) => item.dataValues);
    },
  };

  //房间添加信息
  const addRoomMsg = {
    path: "/room/:id",
    method: "PUT",
    handle: async (ctx, next) => {
      let roomId = ctx.params["id"];
      let { msg } = ctx.request.body;
      try {
        let msgInfo = {
          room_id: roomId,
          message: msg,
          from_id: ctx.userId,
          from_name: ctx.userName,
        };
        let messageModel = await Message.create(msgInfo);
        roomIo
          .to("room_" + roomId)
          .emit("receive_msg", messageModel.dataValues);
        roomIo
          .to("room_" + ctx.userId)
          .emit("receive_msg", messageModel.dataValues);
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
