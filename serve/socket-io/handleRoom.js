const { verify } = require("../utils/token");
const { v4: uuidv4 } = require("uuid");
module.exports = async function handleRoom(socket) {
  let { nsp, handshake } = socket;
  let [_, roomId] = nsp.name.match(/^\/socket\/room\/(\d+)$/);
  let { auth } = handshake;
  let { name, id: userId } = await verify(auth.token);

  console.log(name + "--->" + roomId);
  socket.join("room_" + roomId);
};
