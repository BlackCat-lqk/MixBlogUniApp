"use strict";
const utils_request = require("../utils/request.js");
function getAllBanners(params) {
  return utils_request.get("/getBanner", params, {
    loading: false,
    // 是否显示loading
    showError: false
    // 是否显示错误信息
    // header: {} // 自定义请求头
  });
}
exports.getAllBanners = getAllBanners;
//# sourceMappingURL=../../.sourcemap/mp-weixin/http/banner.js.map
