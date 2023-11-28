const mongoose = require("../db/mongoose");

const WorkSchema = mongoose.Schema(
  {
    // 标题
    title: String,
    // 页面组件列表
    components: [Object],
    // 页面属性
    props: Object,
    setting: Object,
  },
  {
    timestamps: true,
  }
);

const WorkModel = mongoose.model("works", WorkSchema);

module.exports = {
  WorkModel,
};
