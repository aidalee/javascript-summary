export default (arr) => {
  arr.sort((a, b) => a - b);
  //   声明一个空数组用来存储奇偶排序后的数组
  let r = [];
  //   记录奇数偶数位置下标
  let odd = 1;
  let even = 0;
  arr.forEach((item) => {
    if (item % 2 === 1) {
      r[odd] = item;
      odd += 2;
    } else {
      r[even] = item;
      even += 2;
    }
  });
  return r;
};
