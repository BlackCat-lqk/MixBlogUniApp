"use strict";
const utils_request = require("../utils/request.js");
function getAboutConfigApi(params) {
  return utils_request.post("/getAbout", params, {
    loading: false,
    // 是否显示loading
    showError: false
    // 是否显示错误信息
    // header: {} // 自定义请求头
  });
}
exports.getAboutConfigApi = getAboutConfigApi;
//# sourceMappingURL=../../.sourcemap/mp-weixin/http/about.js.map
