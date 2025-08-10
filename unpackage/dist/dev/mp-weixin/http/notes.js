"use strict";
const utils_request = require("../utils/request.js");
function getNotesApi(params) {
  return utils_request.post("/getNotes", params, {
    loading: false,
    // 是否显示loading
    showError: false
    // 是否显示错误信息
    // header: {} // 自定义请求头
  });
}
exports.getNotesApi = getNotesApi;
//# sourceMappingURL=../../.sourcemap/mp-weixin/http/notes.js.map
