const { isRightToken } = require("../utils/token");
const freePath = ["/login", "/test", "/socket", "/register"];
module.exports = async function tokenCheck(ctx, next) {
  if (
    ctx.req.method === "OPTIONS" ||
    freePath.indexOf(ctx.req.url) > -1 ||
    ctx.req.url.indexOf("/socket") === 0
  ) {
    await next();
  } else {
    if (ctx.req.headers["authentication"]) {
      let { result, id, name } = await isRightToken(
        ctx.req.headers["authentication"]
      );
      if (result) {
        ctx["userId"] = id;
        ctx.userName = name;
        await next();
      } else {
        ctx.status = 401;
      }
    } else {
      ctx.status = 401;
    }
  }
};
