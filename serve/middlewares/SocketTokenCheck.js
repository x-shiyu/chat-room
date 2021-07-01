const { isRightToken } = require("../utils/token");
module.exports = async function (socket, next) {
  let { handshake } = socket;
  let { auth } = handshake;
  if (auth.token !== "") {
    let { result } = await isRightToken(auth.token);
    if (result) {
      await next();
    }
  }
};
