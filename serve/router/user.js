const { getUserInfoById } = require("../sql");
const User = require("../model/User");

module.exports = () => {
  const getUserInfo = {
    path: "/user",
    method: "GET",
    handle: async (ctx) => {
      let id = ctx.userId;
      let [data] = await getUserInfoById(id);
      ctx.body = data;
    },
  };

  const register = {
    path: "/register",
    method: "POST",
    handle: async (ctx) => {
      let { username, password, email } = ctx.request.body;
      let sameUser = await User.findOne({
        where: {
          email,
        },
      });
      if (sameUser) {
        ctx.body = {
          code: 400,
          message: "此邮箱已经被注册！",
        };
      } else {
        await User.create({
          name: username,
          password,
          email,
        });
        ctx.body = {
          code: 200,
        };
      }
    },
  };
  return [getUserInfo, register];
};
