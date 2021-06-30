const { getUserIdByEmail, getNewContactFrom } = require("../sql");
const { Contacts, User, NewContactRequest } = require("../model");
const { Op } = require("sequelize");

module.exports = ({ normalIo }) => {
  //联系人信息
  const getAllContacts = {
    path: "/contacts",
    method: "GET",
    handle: async (ctx) => {
      let id = ctx.userId;
      let contacts = await Contacts.findAll({
        where: {
          [Op.or]: [{ per1: id }, { per2: id }],
        },
      });
      contacts = contacts?.map((item) => {
        return item.dataValues.per1 === id
          ? item.dataValues.per2
          : item.dataValues.per1;
      });
      contacts = await User.findAll({
        where: {
          id: {
            [Op.in]: contacts,
          },
        },
      });
      ctx.body = contacts?.map((item) => item.dataValues);
    },
  };

  // 添加联系人
  const addContact = {
    path: "/contacts",
    method: "POST",
    handle: async (ctx) => {
      let { email, remark } = ctx.request.body;
      let id = ctx.userId;
      let [data] = await getUserIdByEmail(email);
      if (data) {
        let result = await Contacts.findOne({
          where: {
            [Op.or]: [
              { per1: id, per2: data.id },
              { per1: data.id, per2: id },
            ],
          },
        });
        if (result) {
          ctx.body = {
            code: 400,
            msg: data.name + "已经是你的联系人了",
          };
        } else {
          let [resultModel, isCreate] = await NewContactRequest.findOrCreate({
            where: {
              from: id,
              to: data.id,
            },
            defaults: {
              accept: 0,
              from: id,
              to: data.id,
              remark,
            },
          });
          if (!isCreate) {
            await resultModel.update({
              remark,
            });
          }
          normalIo.to("user_" + data.id).emit("new_contact_request", {
            name: ctx.userName,
            remark,
            from: id,
            id: resultModel.dataValues.id,
            created_at: Date.now(),
            accept: 0,
          });
          ctx.body = {
            code: 200,
            msg: "发送成功",
          };
        }
      } else {
        ctx.body = {
          code: 400,
          msg: "没有此用户",
        };
      }
    },
  };

  // 获取联系人请求信息
  const getNewContactsInfo = {
    path: "/contacts/new",
    method: "GET",
    async handle(ctx) {
      let result = await getNewContactFrom(ctx.userId);
      ctx.body = result; //result;
    },
  };

  // 同意添加联系人
  const acceptContact = {
    path: "/contacts/accept",
    method: "POST",
    async handle(ctx) {
      let { from } = ctx.request.body;
      // 是否已经是联系人了
      await NewContactRequest.update(
        {
          accept: 1,
        },
        {
          where: {
            [Op.or]: [
              { from: from, to: ctx.userId },
              { from: ctx.userId, to: from },
            ],
          },
        }
      );
      await Contacts.create({
        per1: from,
        per2: ctx.userId,
      });
      let [fromUser, user] = await Promise.all([
        User.findOne({ where: { id: from } }),
        User.findOne({ where: { id: ctx.userId } }),
      ]);

      normalIo.to("user_" + from).emit("new_contact", user.dataValues);

      normalIo.to("user_" + from).emit("new_contact_request", {
        from: ctx.userId,
        accept: 1,
        isAccept: true,
      });

      ctx.body = {
        code: 200,
        data: fromUser.dataValues,
      };
    },
  };

  return [getAllContacts, addContact, getNewContactsInfo, acceptContact];
};
