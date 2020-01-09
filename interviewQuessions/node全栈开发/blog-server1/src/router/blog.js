const {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  delBlog
} = require("../controller/blog");
const { SuccessModel, ErrorModel } = require("../model/resModel");
// 统一的登录验证的中间件
const loginCheck = req => {
  if (!req.session.username) {
    return Promise.resolve(new ErrorModel("尚未登录"));
  }
};
const handleBlogRouter = (req, res) => {
  const method = req.method; // GET POST
  const id = req.query.id; // 获取通用id
  //   const url = req.url;
  //   const path = url.split("?")[0];

  // 获取博客列表
  if (method === "GET" && req.path === "/api/blog/list") {
    const author = req.query.author || "";
    const keyword = req.query.keyword || "";
    // const listData = getList(author, keyword);
    // return new SuccessModel(listData);
    // return {
    //   msg: "这是获取博客列表的接口"
    // };
    const result = getList(author, keyword);
    return result.then(listData => {
      return new SuccessModel(listData);
    });
  }
  // 获取博客详情
  if (method === "GET" && req.path === "/api/blog/detail") {
    // const id = req.query.id;
    // const data = getDetail(id);
    // return new SuccessModel(data);
    // return {
    //   msg: "这是获取博客详情的接口"
    // };
    const result = getDetail(id);
    return result.then(data => {
      return new SuccessModel(data);
    });
  }
  // 新建一篇博客
  if (method === "POST" && req.path === "/api/blog/new") {
    // const data = newBlog(req.body);
    // return new SuccessModel(data);
    // return {
    //   msg: "这是新建博客的接口"
    // };
    // 未登录暂时使用写死的author
    // const author = "zhangsan";
    const loginCheckResult = loginCheck(req);
    if (loginCheckResult) {
      // 未登录
      return loginCheckResult;
    }
    const author = req.session.username;
    req.body.author = author;
    const result = newBlog(req.body);
    return result.then(data => {
      return new SuccessModel(data);
    });
  }
  // 更新一篇博客
  if (method === "POST" && req.path === "/api/blog/update") {
    const result = updateBlog(id, req.body);
    // if (result) {
    //   return new SuccessModel();
    // } else {
    //   return new ErrorModel("更新博客失败");
    // }
    // return {
    //   msg: "这是更新一篇博客的接口"
    // };
    return result.then(val => {
      if (val) {
        return new SuccessModel();
      } else {
        return new ErrorModel("更新博客失败");
      }
    });
  }
  // 删除一篇博客
  if (method === "POST" && req.path === "/api/blog/del") {
    const loginCheckResult = loginCheck(req);
    if (loginCheckResult) {
      // 未登录
      return loginCheckResult;
    }
    const author = req.session.username;
    const result = delBlog(id, author);
    return result.then(val => {
      if (val) {
        return new SuccessModel();
      } else {
        return new ErrorModel("删除博客失败");
      }
    });
    // if (result) {
    //   return new SuccessModel();
    // } else {
    //   return new ErrorModel("删除博客失败");
    // }
    // return {
    //   msg: "这是删除博客的接口"
    // };
  }
};
module.exports = handleBlogRouter;
