const env = process.env.NODE_ENV; // 获取环境变量参数
// 配置
let MYSQL_CONF;
let REDIS_CONF;
if (env === "dev") {
  MYSQL_CONF = {
    host: "localhost",
    user: "root",
    password: "123456",
    port: "3306",
    database: "blogServer"
  };
  REDIS_CONF = {
    port: 6379,
    host: "127.0.0.1"
  };
}
if (env === "production") {
  MYSQL_CONF = {
    host: "localhost",
    user: "root",
    password: "123456",
    port: "3306",
    database: "blogServer"
  };
  REDIS_CONF = {
    port: 6379,
    host: "127.0.0.1"
  };
}
module.exports = {
  MYSQL_CONF,
  REDIS_CONF
};
