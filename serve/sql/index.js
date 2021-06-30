const {
  sequelize,
  querySelect,
  queryAdd,
  redisLRange,
  redisLLen,
} = require("../config/db");
function getUserInfoById(id) {
  return querySelect(`select * from user where id=${id}`);
}
function getContacts(id) {
  return querySelect(
    `select * from contacts where per1 =${id} or per2 = ${id}`
  );
}

function getUserByNamePwd(username, password) {
  return querySelect(
    `select count(0) as num,id,name from user where name='${username}' and password='${password}'`
  );
}
function getUserRoomsById(id) {
  return querySelect(`select room_id from user_room where user_id = ${id}`);
}

function getUserRoomMsg(roomIds) {
  let roomsPro = roomIds.map((roomId) => {
    return new Promise(async (resolve, reject) => {
      let len = await redisLLen("room_" + roomId);
      if (len > 0) {
        let list = await redisLRange("room_" + roomId, 0, len);
        resolve({
          room_id: roomId,
          list: list.map((item) => JSON.parse(item)),
        });
      } else {
        resolve({
          room_id: roomId,
          list: [],
        });
      }
    });
  });
  return Promise.all(roomsPro);
}

async function getRoomPerson(roomIds) {
  return Promise.all(
    roomIds.map(
      (roomInfo) =>
        new Promise(async (resolve, reject) => {
          let roomPer = await querySelect(
            `select name,id,email from user where id in (select user_id from user_room where room_id = ${roomInfo.room_id})`
          );
          resolve({
            room_id: roomInfo.room_id,
            persons: roomPer,
          });
        })
    )
  );
}

async function addRoom(userIds) {
  const t = await sequelize.transaction();
  try {
    const [roomId] = await queryAdd(
      `INSERT INTO room ( msg ) VALUES ( '${JSON.stringify([])}' )`,
      t
    );
    await queryAdd(
      `INSERT INTO user_room ( user_id,room_id ) VALUES ${userIds
        .map((id) => `(${id},${roomId} )`)
        .join(",")}`,
      t
    );
    await t.commit();
    return roomId;
  } catch (error) {
    await t.rollback();
    return undefined;
  }
}

function getUserContactRoom(userId, targetId) {
  return querySelect(
    `select room_id from user_room where user_id=${userId} and room_id in (select room_id from user_room where user_id = ${targetId})`
  );
}

function roomMatch(userId, roomId) {
  return querySelect(
    `select count(0) as num from user_room where user_id=${userId} and room_id=${roomId}`
  );
}

function getUserIdByEmail(email) {
  return querySelect(`select id,name from user where email = '${email}'`);
}

function addContact(originId, targetId, remark) {
  return queryAdd(
    `INSERT INTO contacts ( per1,per2,accept,remark ) VALUES ( ${originId},${targetId},null,'${remark}' )`
  );
}

function getNewContactsList(id) {
  return querySelect(
    `select * from user WHERE id IN  (SELECT per2 as contactId from contacts where per1 = ${id}  AND accept IS NULL)`
  );
}

function getNewContactFrom(id) {
  return querySelect(`
  select new_contact_request.from as \'from\', \'name\' ,accept,remark,new_contact_request.id as id,new_contact_request.created_at as created_at from user left join new_contact_request on user.id = new_contact_request.from
where new_contact_request.to = ${id}
  `);
}

module.exports = {
  getUserInfoById,
  getContacts,
  getUserByNamePwd,
  getUserRoomsById,
  getUserRoomMsg,
  getUserContactRoom,
  getRoomPerson,
  getNewContactsList,
  getUserIdByEmail,
  getNewContactFrom,

  addRoom,
  roomMatch,
  addContact,
};
