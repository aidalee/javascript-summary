const { login } = require("../controller/user");
const { SuccessModel, ErrorModel } = require("../model/resModel");
// 获取cookie的过期时间
// const getCookieExpires = () => {
//   const d = new Date();
//   d.setTime(d.getTime() + 24 * 60 * 60 * 1000);
//   return d.toGMTString();
// };
const handleUserRouter = (req, res) => {
  const method = req.method; // GET POST
  //   const url = req.url;
  //   const path = url.split("?")[0];

  // 登录
  if (method === "POST" && req.path === "/api/user/login") {
    const { username, password } = req.body;
    const result = login(username, password);
    // if (result) {
    //   return new SuccessModel();
    // }
    // return new ErrorModel("登录失败");
    return result.then(data => {
      if (data.username) {
        // 设置cookie
        // res.setHeader(
        //   "Set-Cookie",
        //   `username=${
        //     data.username
        //   }; path=/; httpOnly; expires=${getCookieExpires()}`
        // );
        req.session.username = data.username;
        req.session.realname = data.realname;
        console.log("req.session is ", req.session);
        return new SuccessModel();
      }
      return new ErrorModel("登录失败");
    });
    // return {
    //   msg: "这是登录的接口"
    // };
  }
  // 暂时的登录验证
  // if (method === "GET" && req.path === "/api/user/login-test") {
  //   if (req.session.username) {
  //     return Promise.resolve(
  //       new SuccessModel({
  //         session: req.session
  //       })
  //     );
  //   }
  //   return Promise.resolve(new ErrorModel("尚未登录"));
  // }
};
module.exports = handleUserRouter;
