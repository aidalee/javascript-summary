var express = require("express");
var router = express.Router();

/* GET home page. */
// 相当于if(method==='get'&& req.path==='/')
router.get("/", function(req, res, next) {
  res.render("index", { title: "Express" });
});

module.exports = router;
