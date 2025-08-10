"use strict";
const common_vendor = require("../common/vendor.js");
const config = {
  baseURL: "https://m.mixblog.cn/api",
  // 基础URL
  timeout: 6e4,
  // 超时时间(毫秒)
  header: {
    "Content-Type": "application/json"
    // 默认请求头
  }
};
const requestQueue = [];
const showLoading = () => {
  common_vendor.index.showLoading({
    title: "加载中...",
    mask: true
  });
};
const hideLoading = () => {
  common_vendor.index.hideLoading();
};
const requestInterceptor = (options) => {
  if (options.loading !== false) {
    showLoading();
  }
  const token = common_vendor.index.getStorageSync("token");
  if (token) {
    options.header = options.header || {};
    options.header["Authorization"] = `Bearer ${token}`;
  }
  return options;
};
const responseInterceptor = (response, options) => {
  if (options.loading !== false) {
    hideLoading();
  }
  if (response.statusCode === 200) {
    return Promise.resolve(response.data);
  } else {
    return Promise.reject(response);
  }
};
const errorHandler = (error, options) => {
  if (options.loading !== false) {
    hideLoading();
  }
  let errMsg = "请求失败";
  if (error.errMsg) {
    errMsg = error.errMsg;
  } else if (error.message) {
    errMsg = error.message;
  }
  if (error.statusCode === 401) {
    common_vendor.index.navigateTo({
      url: "@/pages/login/login"
    });
  }
  if (options.showError !== false) {
    common_vendor.index.showToast({
      title: errMsg,
      icon: "none",
      duration: 2e3
    });
  }
  return Promise.reject(error);
};
const request = (options) => {
  options = { ...config, ...options };
  if (!options.url.startsWith("http") && config.baseURL) {
    options.url = config.baseURL + options.url;
  }
  options = requestInterceptor(options) || options;
  const requestKey = `${options.method}_${options.url}_${JSON.stringify(options.data)}`;
  if (options.preventDuplicate) {
    const existRequest = requestQueue.find((item) => item.key === requestKey);
    if (existRequest) {
      return existRequest.request;
    }
  }
  const requestPromise = new Promise((resolve, reject) => {
    common_vendor.index.request({
      ...options,
      success: (res) => {
        requestQueue.splice(requestQueue.findIndex((item) => item.key === requestKey), 1);
        responseInterceptor(res, options).then((data) => resolve(data)).catch((err) => reject(err));
      },
      fail: (err) => {
        requestQueue.splice(requestQueue.findIndex((item) => item.key === requestKey), 1);
        errorHandler(err, options).catch((err2) => reject(err2));
      }
    });
  });
  if (options.preventDuplicate) {
    requestQueue.push({
      key: requestKey,
      request: requestPromise
    });
  }
  return requestPromise;
};
const get = (url, data = {}, options = {}) => {
  return request({
    url,
    data,
    method: "GET",
    ...options
  });
};
const post = (url, data = {}, options = {}) => {
  return request({
    url,
    data,
    method: "POST",
    ...options
  });
};
exports.get = get;
exports.post = post;
//# sourceMappingURL=../../.sourcemap/mp-weixin/utils/request.js.map
