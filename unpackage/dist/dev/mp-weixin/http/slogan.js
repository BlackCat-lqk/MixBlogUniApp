"use strict";
const utils_request = require("../utils/request.js");
function getSloganApi(params) {
  return utils_request.get("/getSlogan", params, {
    loading: false,
    // 是否显示loading
    showError: false
    // 是否显示错误信息
    // header: {} // 自定义请求头
  });
}
exports.getSloganApi = getSloganApi;
//# sourceMappingURL=../../.sourcemap/mp-weixin/http/slogan.js.map
