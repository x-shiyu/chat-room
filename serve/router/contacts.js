const {
  getContacts,
} = require("../sql");
const { getUserIdByEmail, getNewContactsList } = require('../sql')
const { Contacts, User } = require('../model')
const { Op } = require('sequelize')

module.exports = ({ normalIo }) => {
  //联系人信息
  const getAllContacts = {
    path: "/contacts",
    method: 'GET',
    handle: async (ctx) => {
      let id = ctx.userId;
      let contacts = await getContacts(id);
      ctx.body = contacts;
    }
  }

  // 添加联系人
  const addContact = {
    path: "/contacts",
    method: 'POST',
    handle: async (ctx) => {
      let { email, remark } = ctx.request.body;
      let id = ctx.userId;
      let [data] = await getUserIdByEmail(email)
      if (data) {
        let result = await Contacts.findOne({
          where: {
            per1: id,
            per2: data.id,
          }
        })
        if (result) {
          let { dataValues: { accept } } = result;
          if (accept === 1) {
            ctx.body = {
              code: 400,
              msg: data.name + '已经是你的联系人了'
            }
            return
          } else {
            await Contacts.update({
              remark
            }, {
              where: {
                per1: id,
                per2: data.id
              }
            })
          }
        } else {
          await Contacts.create({
            per1: id,
            per2: data.id,
            remark: remark
          })
        }
        normalIo.to('user_' + data.id).emit('receive_contact', {
          name: ctx.userName,
          remark,
          id
        })
        ctx.body = {
          code: 200,
          msg: '发送成功'
        }
      } else {
        ctx.body = {
          code: 400,
          msg: '没有此用户'
        }
      }
    }
  }

  // 获取联系人请求信息
  const getNewContactsInfo = {
    path: "/contacts/new",
    method: "GET",
    async handle(ctx) {
      let result = await getNewContactsList(ctx.userId)
      ctx.body = result
    }
  }

  // 同意添加联系人
  const acceptContact = {
    path: "/contacts/accept",
    method: "POST",
    async handle(ctx) {
      let { id } = ctx.request.body;
      // 是否已经是联系人了
      await Contacts.findOrCreate({
        per1:ctx.userId,
        per2:id,
      },{
        where:{
          per1:ctx.userId,
          per2:id,
        }
      })
      await Contacts.update({
        accept: 1
      }, {
        where: {
          [Op.or]: [{ per1: id, per2: ctx.userId }, { per1: ctx.userId, per2: id }]
        }
      })
      let [targetInfo,userInfo] = await Promise.all([User.findOne({where:{id}}),User.findOne({where:{id:ctx.userId}})])
      normalIo.to('user_'+id).emit('new_contact',userInfo.dataValues)
      ctx.body={
        code:200,
        data:targetInfo.dataValues
      }
    }
  }

  return [getAllContacts, addContact, getNewContactsInfo, acceptContact]
}

