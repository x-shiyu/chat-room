const { Sequelize } = require("sequelize");

const USER_NAME = process.env.DB_NAME || "root";
const PASSWORD = process.env.DB_PASSWORD || "123456";
const PORT = process.env.DB_PORT || 3307;
const sequelize = new Sequelize("chat_room", USER_NAME, PASSWORD, {
  dialect: "mariadb",
  host: "localhost",
  port: PORT,
  timezone: "+08:00",
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
  query,
  querySelect,
  queryAdd,
};
