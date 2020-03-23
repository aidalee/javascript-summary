// 重复的子字符串
const IsRepeatStr = str => {
  var reg = /^(\w+)\1+$/;
  return reg.test(str);
};
console.log(IsRepeatStr("ababab"));
console.log(IsRepeatStr("ab"));
console.log(IsRepeatStr("abababc"));
console.log(IsRepeatStr("abcabcabc"));
