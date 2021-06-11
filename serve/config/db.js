const { Sequelize } = require("sequelize");
const redis = require("redis");
const { promisify } = require("util");

const client = redis.createClient({
  host: "127.0.0.1",
});
const redisGet = promisify(client.get).bind(client);
const redisSet = promisify(client.set).bind(client);
const redisExpire = promisify(client.expire).bind(client);
const redisLLen = promisify(client.llen).bind(client);
const redisLPush = promisify(client.lpush).bind(client);
const redisLRange = promisify(client.lrange).bind(client);
const redisRPush = promisify(client.rpush).bind(client);

client.on("error", function (error) {
  console.error(error);
});

// 方法 2: 分别传递参数 (sqlite)
const sequelize = new Sequelize("chat_room", "root", "123456", {
  dialect: "mariadb",
  host: "172.21.213.162",
  port: 3306,
});
function query(sql, type, transaction) {
  return sequelize.query(sql, {
    raw: true,
    type,
    transaction,
  });
}
function querySelect(sql) {
  return query(sql, sequelize.QueryTypes.SELECT);
}
function queryAdd(sql, transaction) {
  return query(sql, sequelize.QueryTypes.INSERT, transaction);
}
module.exports = {
  sequelize,
  redisGet,
  redisSet,
  redisExpire,
  redisLLen,
  redisLPush,
  redisLRange,
  redisRPush,
  query,
  querySelect,
  queryAdd,
};
