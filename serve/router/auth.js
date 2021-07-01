const { getUserByNamePwd } = require("../sql");
const { sign } = require("../utils/token");
const { expires } = require("../config/conts");

module.exports = () => {
  ////登录
  const login = {
    path: "/login",
    method: "POST",
    handle: async (ctx) => {
      let { username, password } = ctx.request.body;
      let [data] = await getUserByNamePwd(username, password);
      if (data.num === 1) {
        let token = sign({
          id: data.id,
          name: data.name,
          expire: Date.now() + expires,
        });
        global.tokens[data.id + data.name] = token;
        ctx.body = {
          token,
          expire: Date.now() + expires,
        };
      } else {
        ctx.status = 403;
        ctx.body = "用户名或密码错误!";
      }
    },
  };
  return [login];
};
