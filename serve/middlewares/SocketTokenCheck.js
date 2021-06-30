const { isExpires } = require("../utils/token");
module.exports = async function (socket, next) {
  let { handshake } = socket;
  let { auth } = handshake;
  if (auth.token !== "") {
    let { token } = await isExpires(auth.token);
    if (token === token) {
      await next();
    }
  }
};
