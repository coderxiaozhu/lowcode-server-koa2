const os = require("os");

const cpuCoreLength = os.cpus().length;

module.exports = {
  name: "lowcode_server", // 服务名称
  script: "bin/www", // 服务启动入口
  ignore_watch: ["node_modules", "__test__", "logs"], // 监听排除目录
  instances: cpuCoreLength, // 进程数量  本地测试 一个即可
  error_file: "./logs/err.log", // 错误日志目录
  out_file: "./logs/out.log", // 日志目录
  log_date_format: "YYYY-MM-DD HH:mm:ss Z", // Z 表示使用当前时区的时间格式
  combine_logs: true, // 多个实例，合并日志
  max_memory_restart: "300M", // 内存占用超过 300M ，则重启
};
