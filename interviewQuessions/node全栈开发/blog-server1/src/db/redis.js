const redis = require("redis");
const { REDIS_CONF } = require("../conf/db");
// 创建客户端
const redisClient = redis.createClient(REDIS_CONF.port, REDIS_CONF.host);
redisClient.on("error", err => {
  console.error(err);
});
// 测试
function set(key, val) {
  if (typeof val === "object") {
    val = JSON.stringify(val); // val值类型是字符串
  }
  redisClient.set(key, val, redis.print);
}
function get(key) {
  const promise = new Promise((resolve, reject) => {
    redisClient.get(key, (err, val) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(val);
      if (val == null) {
        resolve(null);
        return;
      }
      //   兼容json格式转换
      try {
        resolve(JSON.parse(val));
      } catch (ex) {
        resolve(val);
      }
      // 退出
      //   redisClient.quit();
    });
  });
  return promise;
}

module.exports = {
  set,
  get
};
