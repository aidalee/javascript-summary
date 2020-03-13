var express = require("express");
var router = express.Router();
router.get("/list", function(req, res, next) {
  res.json({
    // 解析成字符串形式并且加上content-type头
    errno: 0,
    data: [1, 2, 3]
  });
});

module.exports = router;
