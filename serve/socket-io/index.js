const { redisLLen, redisLRange, redisRPush } = require("../config/db");
const { getChatList } = require("../utils/chats");
const { verify } = require("../utils/token");
const { v4: uuidv4 } = require("uuid");
module.exports = {
  handleRoom(socket) {
    let { nsp, handshake } = socket;
    let [_, roomId] = nsp.name.match(/^\/socket\/room\/(\d+)$/);
    let { auth } = handshake;
    socket.on("add_msg", async (msg) => {
      let { name, id: userId } = await verify(auth.token);
      try {
        let id = uuidv4();
        let time = Date.now();
        let msgInfo = {
          id,
          msg,
          name: name,
          userId,
          time,
        };
        await redisRPush("room_" + roomId, JSON.stringify(msgInfo));
        socket.emit("add_msg", msgInfo);
      } catch (err) {
        socket.emit("add_msg", false);
      }
    });

    socket.on("msg_list", async () => {
      let list = await getChatList(roomId);
      socket.emit("msg_list", list);
    });
  },
  handleContact(socket) {
    socket.on("add_contact", (email) => {
      console.log(email);
    });
  },
};
