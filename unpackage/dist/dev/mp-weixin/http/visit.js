"use strict";
const utils_request = require("../utils/request.js");
const common_vendor = require("../common/vendor.js");
function getVisitStatsApi(params) {
  return utils_request.get("/visit-stats", params, {
    loading: false,
    // 是否显示loading
    showError: false
    // 是否显示错误信息
    // header: {} // 自定义请求头
  });
}
function recordVisitApi(params) {
  return utils_request.post("/record-visit", params, {
    loading: false,
    // 是否显示loading
    showError: false
    // 是否显示错误信息
    // header: {} // 自定义请求头
  });
}
function getVisitorIpApi(params) {
  const service = common_vendor.axios.create({
    baseURL: "",
    timeout: 3e4
    // 请求超时时间
  });
  return service.get("https://ipinfo.io/json");
}
exports.getVisitStatsApi = getVisitStatsApi;
exports.getVisitorIpApi = getVisitorIpApi;
exports.recordVisitApi = recordVisitApi;
//# sourceMappingURL=../../.sourcemap/mp-weixin/http/visit.js.map
