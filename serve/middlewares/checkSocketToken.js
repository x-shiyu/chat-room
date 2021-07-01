const { isRightToken } = require("../utils/token");
const { roomMatch } = require("../sql");
module.exports = async function (socket, next) {
  let { nsp, handshake } = socket;
  let nspName = nsp.name;
  let [_, roomId] = nspName.match(/^\/socket\/room\/(\d+)$/);
  let { auth } = handshake;
  if (auth.token !== "") {
    let { result, id } = await isRightToken(auth.token);
    let [{ num }] = await roomMatch(id, roomId);
    if (result && num === 1) {
      await next();
    }
  }
};
