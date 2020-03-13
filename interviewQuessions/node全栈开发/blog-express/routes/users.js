var express = require("express");
var router = express.Router();

/* GET users listing. */
// 相当于if(method==='get'&& req.path==='/users/')
router.get("/", function(req, res, next) {
  res.send("respond with a resource");
});

module.exports = router;
