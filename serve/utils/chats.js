const { redisLLen, redisLRange, redisRPush } = require("../config/db");
async function getChatList(roomId) {
  let len = await redisLLen(roomId);
  if (len > 0) {
    return await redisLRange(roomId, 0, len);
  }
  return [];
}

async function addMsg(roomId, msg) {
  return await redisRPush("room");
}
module.exports = {
  getChatList,
};
