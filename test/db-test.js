const {
  getContacts,
  getUserInfoById,
  getUserByNamePwd,
  addRoom,
} = require("../serve/sql");
const {
  queryAdd,
  redisLLen,
  redisLRange,
  querySelect,
} = require("../serve/config/db");
async function test() {
  let data = await querySelect("select * from user");
  console.log(data);
}

test();
