async function headerSet(ctx, next) {
  ctx.set("Access-Control-Allow-Origin", "*");
  ctx.set("Access-Control-Allow-Credentials", true);
  ctx.set("Access-Control-Allow-Headers", "Authentication,content-type");
  ctx.set("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE");
  await next();
}

module.exports = headerSet;
