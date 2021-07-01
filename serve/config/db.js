const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("chat_room", "root", "123456", {
  dialect: "mariadb",
  host: "localhost",
  port: 3307,
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
