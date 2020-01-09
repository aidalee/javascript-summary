const { exec } = require("../db/mysql");
const getList = (author, keyword) => {
  // 先返回正确格式的假数据
  // return [
  //   {
  //     id: 1,
  //     title: "标题A",
  //     content: "内容A",
  //     createTime: 1546610491112,
  //     author: "zhangsan"
  //   },
  //   {
  //     id: 2,
  //     title: "标题B",
  //     content: "内容B",
  //     createTime: 1546610491190,
  //     author: "lisi"
  //   }
  // ];
  let sql = `select * from blogs where 1=1 `;
  // 1=1避免了author和keyword没有值 sql语句报错
  if (author) {
    sql += `and author = '${author}' `;
  }
  if (keyword) {
    sql += `and title like '%${keyword}%' `;
  }
  sql += `order by createtime desc;`;
  // 返回promise
  return exec(sql);
};
const getDetail = id => {
  // 先返回假数据
  // return {
  //   id: 1,
  //   title: "标题A",
  //   content: "内容A",
  //   createTime: 1546610491112,
  //   author: "zhangsan"
  // };
  const sql = `select * from blogs where id = '${id}'`;
  return exec(sql).then(rows => {
    return rows[0];
  });
};
const newBlog = (blogData = {}) => {
  //   console.log("new blog", blogData);
  // blogData是一个博客对象，包含title 、content属性
  // return {
  //   id: 3 // 表示新建博客，插入到数据表里面的id
  // };
  const { title, content, author } = blogData;
  const createtime = Date.now();
  const sql = `insert into blogs (title,content,createtime,author) values ('${title}','${content}',${createtime},'${author}')`;
  return exec(sql).then(insertData => {
    // console.log("insertData is", insertData);
    return {
      id: insertData.insertId
    };
  });
};
const updateBlog = (id, blogData = {}) => {
  // console.log("update blog", id, blogData);
  // return true;
  const { title, content } = blogData;
  const sql = `update blogs set title='${title}',content='${content}' where id=${id}`;
  return exec(sql).then(updateData => {
    console.log("updateData is", updateData);
    if (updateData.affectedRows > 0) {
      return true;
    }
    return false;
  });
};
const delBlog = (id, author) => {
  // console.log("删除博客", id);
  // return true;
  const sql = `delete from blogs where id=${id} and author='${author}'`;
  return exec(sql).then(deleteData => {
    if (deleteData.affectedRows > 0) {
      return true;
    }
    return false;
  });
};
module.exports = {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  delBlog
};
