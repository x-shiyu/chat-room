const {
  getContacts,
  getUserInfoById,
  getUserByNamePwd,
  addRoom,
} = require("../serve/sql");
const { queryAdd, redisLLen, redisLRange } = require("../serve/config/db");
async function test() {
  let data = await redisLRange("room_test", 0, 1);
  console.log(data);
}

test();
