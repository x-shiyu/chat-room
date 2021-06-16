const { verify } = require("../utils/token");

module.exports = async function handleContact(socket) {
  let { handshake } = socket;
  let { auth } = handshake;
  let { id, name } = await verify(auth.token);

  console.log(`${name}：发送添加联系人请求`)
  socket.join('contact_' + id)

}