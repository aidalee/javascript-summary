var express = require("express");
var router = express.Router();
router.post("/login", function(req, res, next) {
  const { username, password } = req.body;
  res.json({
    // 解析成字符串形式并且加上content-type头
    errno: 0,
    data: { username, password }
  });
});

module.exports = router;
