const { redisLLen, redisLRange } = require("../config/db");
async function getChatList(roomId) {
  let len = await redisLLen(roomId);
  if (len > 0) {
    return await redisLRange(roomId, 0, len);
  }
  return [];
}

module.exports = {
  getChatList,
};
