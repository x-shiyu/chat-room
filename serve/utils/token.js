const jwt = require("jsonwebtoken");
const { secret, expires } = require("../config/conts");
const { redisGet } = require("../config/db");
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

async function isExpires(tokenInput) {
  let { id, name } = await verify(tokenInput);
  let token = await redisGet(id + name);
  return {
    token,
    id,
    name,
  };
}
module.exports = {
  sign,
  verify,
  isExpires,
};
