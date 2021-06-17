const {
  getContacts,
  getUserInfoById,
  getUserByNamePwd,
  addRoom,
} = require("../sql");
const {
  queryAdd,
  redisLLen,
  redisLRange,
  querySelect,
} = require("../config/db");
const { User, Contacts } = require("../model");
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
  let data = await Contacts.findAll({
    where: {
      [Op.or]: [{ per1: 1 }, { per2: 1 }],
    },
  });
  console.log(data);
}

test();
