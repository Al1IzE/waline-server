const Waline = require('@waline/vercel');

module.exports = Waline({
  // 数据库地址会通过 Vercel 的环境变量安全读取
});