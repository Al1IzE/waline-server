const walineModule = require('@waline/vercel');

// 1. 把这个包里到底有什么，打印到 Vercel 后台日志里
console.log('Waline 模块真正导出的东西:', Object.keys(walineModule || {}));

// 2. 自动兼容三种可能的导出方式（带大括号的、default默认的、直接导出的）
const Waline = walineModule.Waline || walineModule.default || walineModule;

// 3. 安全检查：如果是函数就正常运行，如果不是，拦截报错不让系统崩溃
if (typeof Waline === 'function') {
  module.exports = Waline({
    // 数据库地址会自动读取 Vercel 里的 MONGO_URL 环境变
  });
} else {
  module.exports = (req, res) => {
    res.status(500).json({
      error: 'Waline 依然不是一个函数！',
      exportedKeys: Object.keys(walineModule || {})
    });
  };
}