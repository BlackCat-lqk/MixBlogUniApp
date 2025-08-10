"use strict";
const utils_request = require("../utils/request.js");
function getAllBlogArticleApi(params) {
  return utils_request.get("/articles-with-stats", params, {
    loading: false,
    // 是否显示loading
    showError: false
    // 是否显示错误信息
    // header: {} // 自定义请求头
  });
}
exports.getAllBlogArticleApi = getAllBlogArticleApi;
//# sourceMappingURL=../../.sourcemap/mp-weixin/http/blogArticle.js.map
