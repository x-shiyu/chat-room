const { Room, UserRoom, User } = require("../model");
const { sequelize } = require("../config/db");
const { getUserContactRoom } = require("../sql");
async function createRoom(allUsers) {
  const t = await sequelize.transaction();
  //创建房间
  try {
    let roomModel = await Room.create(
      {
        msg: "",
      },
      {
        transaction: t,
      }
    );
    await Promise.all(
      allUsers.map((userId) => {
        return UserRoom.create(
          {
            user_id: userId,
            room_id: roomModel.dataValues.id,
          },
          {
            transaction: t,
          }
        );
      })
    );
    await t.commit();
    return roomModel.dataValues.id;
  } catch (err) {
    console.log(err);
    await t.rollback();
    return false;
  }
}
async function handleCreateRoom(userId, contactId) {
  let roomId = null;
  let allUserId = [userId, ...contactId];
  let allUsers = await Promise.all(
    allUserId.map((id) => {
      return User.findOne({
        where: {
          id,
        },
      });
    })
  );
  if (contactId.length === 1) {
    let [roomInfo] = await getUserContactRoom(userId, contactId[0]);
    if (roomInfo) {
      roomId = roomInfo.room_id;
    } else {
      roomId = await createRoom(allUserId);
    }
  } else {
    roomId = await createRoom(allUserId);
  }
  return {
    room_id: roomId,
    persons: allUsers.map((item) => item.dataValues),
  };
}
module.exports = {
  handleCreateRoom,
};
