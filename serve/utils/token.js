const jwt = require("jsonwebtoken");
const { secret, expires } = require("../config/conts");
global.tokens = {};
function sign(data) {
  data["expires"] = Date.now() + expires;
  return jwt.sign(data, secret);
}

function verify(token) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secret, function (err, decoded) {
      if (err) {
        reject(err);
      }
      resolve(decoded);
    });
  });
}

async function isRightToken(tokenInput) {
  try {
    let { id, name, expire } = await verify(tokenInput);
    let token = global.tokens[id + name];
    if (expire < Date.now() || tokenInput !== token) {
      return {
        result: false,
      };
    }
    return {
      result: true,
      name,
      id,
    };
  } catch (err) {
    return {
      result: false,
    };
  }
}
module.exports = {
  sign,
  verify,
  isRightToken,
};
