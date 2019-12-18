const getList = (author, keyword) => {
  // 先返回正确格式的假数据
  return [
    {
      id: 1,
      title: "标题A",
      content: "内容A",
      createTime: 1546610491112,
      author: "zhangsan"
    },
    {
      id: 2,
      title: "标题B",
      content: "内容B",
      createTime: 1546610491190,
      author: "lisi"
    }
  ];
};
const getDetail = id => {
  // 先返回假数据
  return {
    id: 1,
    title: "标题A",
    content: "内容A",
    createTime: 1546610491112,
    author: "zhangsan"
  };
};
const newBlog = (blogData = {}) => {
  //   console.log("new blog", blogData);
  // blogData是一个博客对象，包含title 、content属性
  return {
    id: 3 // 表示新建博客，插入到数据表里面的id
  };
};
const updateBlog = (id, blogData = {}) => {
  console.log("update blog", id, blogData);
  return true;
};
const delBlog = id => {
  console.log("删除博客", id);
  return true;
};
module.exports = {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  delBlog
};
