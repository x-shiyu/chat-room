const {
  getContacts,
  getUserInfoById,
  getUserByNamePwd,
  addRoom,
  getUserContactRoom,
} = require("../sql");
const {
  queryAdd,
  redisLLen,
  redisLRange,
  querySelect,
} = require("../config/db");
const { User, Contacts, Message } = require("../model");
const { Op } = require("sequelize");
async function test() {
  // let data = await Contacts.update({
  //     accept:null
  // },{
  //     where:{
  //         [Op.or]: [{ per1: 1, per2:4 }, { per1: 4, per2: 1 }]
  //     }
  // });
  // let data = await Promise.all([User.findOne({where:{id:1}}),User.findOne({where:{id:4}})])
  // let data = await getContacts(1);
  // let data = await Message.create({
  //   room_id: 12,
  //   message: "cqqwqdqwd",
  //   from_id: 1,
  //   from_name: "春蛙秋蝉",
  // });
  // let data = await Message.findAll();
  // console.log(data.getDataValue("created_at"));
  let [data] = await getUserContactRoom(1, 11);
  debugger;
}

test();
