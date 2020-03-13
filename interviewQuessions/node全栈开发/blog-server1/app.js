const querystring = require("querystring");
const { get, set } = require("./src/db/redis");
const { access } = require("./src/utils/log");
const handleBlogRouter = require("./src/router/blog");
const handleUserRouter = require("./src/router/user");
const getCookieExpires = () => {
  const d = new Date();
  d.setTime(d.getTime() + 24 * 60 * 60 * 1000);
  return d.toGMTString();
};
// session数据
const SESSION_DATA = {};
// 用于处理post data 因为post data的过程是异步的
const getPostData = req => {
  const promise = new Promise((resolve, reject) => {
    if (req.method !== "POST") {
      resolve({}); // get请求没有post data直接返回空对象
      return;
    }
    if (req.headers["content-type"] !== "application/json") {
      // 如果传入的数据格式不是json格式的，忽略post data 返回空对象
      resolve({});
      return;
    }
    let postData = "";
    req.on("data", chunk => {
      postData += chunk.toString();
    });
    req.on("end", () => {
      if (!postData) {
        resolve({});
        return;
      }
      resolve(JSON.parse(postData));
    });
  });
  return promise;
};
const serverHandle = (req, res) => {
  // 记录access log
  access(
    `${req.method}--${req.url}--${req.headers["user-agent"]}--${Date.now()}`
  );
  res.setHeader("Content-type", "application/json");
  // 获取path
  const url = req.url;
  req.path = url.split("?")[0];
  // 解析query
  req.query = querystring.parse(url.split("?")[1]);
  // 解析cookie
  req.cookie = {};
  const cookieStr = req.headers.cookie || "";
  cookieStr.split(";").forEach(item => {
    if (!item) {
      return;
    }
    const arr = item.split("=");
    const key = arr[0].trim();
    const val = arr[1].trim();
    req.cookie[key] = val;
  });
  console.log("req.cookie is", req.cookie);
  // 解析session
  let needSetCookie = false;
  let userId = req.cookie.userid;
  if (userId) {
    if (!SESSION_DATA[userId]) {
      SESSION_DATA[userId] = {};
    }
  } else {
    needSetCookie = true;
    userId = `${Date.now()}_${Math.random()}`;
    SESSION_DATA[userId] = {};
  }
  req.session = SESSION_DATA[userId];
  // 处理post data
  getPostData(req).then(postData => {
    req.body = postData; // post的值给到body

    // 处理blog路由
    // const blogData = handleBlogRouter(req, res);
    // if (blogData) {
    //   res.end(JSON.stringify(blogData));
    //   return;
    // }
    const blogResult = handleBlogRouter(req, res);
    if (blogResult) {
      blogResult.then(blogData => {
        if (needSetCookie) {
          res.setHeader(
            "Set-Cookie",
            `userid=${userId}; path=/; httpOnly; expires=${getCookieExpires()}`
          );
        }
        res.end(JSON.stringify(blogData));
      });
      return;
    }
    // 处理user路由
    // const userData = handleUserRouter(req, res); // 从router中获取到经model处理过的返回结果
    // if (userData) {
    //   res.end(JSON.stringify(userData)); // 返回内容写入response
    //   return;
    // }
    const userResult = handleUserRouter(req, res);
    if (userResult) {
      userResult.then(userData => {
        if (needSetCookie) {
          res.setHeader(
            "Set-Cookie",
            `userid=${userId}; path=/; httpOnly; expires=${getCookieExpires()}`
          );
        }
        res.end(JSON.stringify(userData));
      });
      return;
    }
    // 未命中路由，返回404
    res.writeHead(404, {
      "Content-type": "text/plain"
    });
    res.write("404 Not Found\n");
    res.end();
  });
};
module.exports = serverHandle;

// process.env.NODE_ENV
