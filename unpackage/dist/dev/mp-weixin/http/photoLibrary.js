"use strict";
const utils_request = require("../utils/request.js");
function getPhotoLibraryApi(params) {
  return utils_request.get("/getPhotoLibrary", params, {
    loading: false,
    // 是否显示loading
    showError: false
    // 是否显示错误信息
    // header: {} // 自定义请求头
  });
}
exports.getPhotoLibraryApi = getPhotoLibraryApi;
//# sourceMappingURL=../../.sourcemap/mp-weixin/http/photoLibrary.js.map
