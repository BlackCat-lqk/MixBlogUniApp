// 基础配置
const config = {
  baseURL: '/api', // 基础URL
  timeout: 60000, // 超时时间(毫秒)
  header: {
    'Content-Type': 'application/json' // 默认请求头
  }
};

// 请求队列
const requestQueue = [];

/**
 * 显示加载框
 */
const showLoading = () => {
  uni.showLoading({
    title: '加载中...',
    mask: true
  });
};

/**
 * 隐藏加载框
 */
const hideLoading = () => {
  uni.hideLoading();
};

/**
 * 请求拦截器
 */
const requestInterceptor = (options) => {
  // 显示loading
  if (options.loading !== false) {
    showLoading();
  }
  
  // 添加token
  const token = uni.getStorageSync('token');
  if (token) {
    options.header = options.header || {};
    options.header['Authorization'] = `Bearer ${token}`;
  }
  
  return options;
};

/**
 * 响应拦截器
 */
const responseInterceptor = (response, options) => {
  // 隐藏loading
  if (options.loading !== false) {
    hideLoading();
  }
  
  // 处理响应数据
  if (response.statusCode === 200) {
    return Promise.resolve(response.data);
  } else {
    return Promise.reject(response);
  }
};

/**
 * 错误处理
 */
const errorHandler = (error, options) => {
  // 隐藏loading
  if (options.loading !== false) {
    hideLoading();
  }
  
  // 处理错误
  let errMsg = '请求失败';
  if (error.errMsg) {
    errMsg = error.errMsg;
  } else if (error.message) {
    errMsg = error.message;
  }
  
  // 401 token过期处理
  if (error.statusCode === 401) {
    // 跳转到登录页
    uni.navigateTo({
      url: '@/pages/login/login'
    });
  }
  
  // 提示错误信息
  if (options.showError !== false) {
    uni.showToast({
      title: errMsg,
      icon: 'none',
      duration: 2000
    });
  }
  
  return Promise.reject(error);
};

/**
 * 基础请求方法
 * @param {Object} options 请求配置
 * @returns {Promise} 返回Promise对象
 */
const request = (options) => {
  // 合并配置
  options = { ...config, ...options };
  
  // 处理完整URL
  if (!options.url.startsWith('http') && config.baseURL) {
    options.url = config.baseURL + options.url;
  }
  
  // 请求拦截
  options = requestInterceptor(options) || options;
  
  // 生成请求唯一标识
  const requestKey = `${options.method}_${options.url}_${JSON.stringify(options.data)}`;
  
  // 检查重复请求
  if (options.preventDuplicate) {
    const existRequest = requestQueue.find(item => item.key === requestKey);
    if (existRequest) {
      return existRequest.request;
    }
  }
  
  // 创建请求Promise
  const requestPromise = new Promise((resolve, reject) => {
    uni.request({
      ...options,
      success: (res) => {
        // 从队列中移除
        requestQueue.splice(requestQueue.findIndex(item => item.key === requestKey), 1);
        // 响应拦截
        responseInterceptor(res, options)
          .then(data => resolve(data))
          .catch(err => reject(err));
      },
      fail: (err) => {
        // 从队列中移除
        requestQueue.splice(requestQueue.findIndex(item => item.key === requestKey), 1);
        // 错误处理
        errorHandler(err, options)
          .catch(err => reject(err));
      }
    });
  });
  
  // 添加到请求队列
  if (options.preventDuplicate) {
    requestQueue.push({
      key: requestKey,
      request: requestPromise
    });
  }
  
  return requestPromise;
};

// 导出常用方法
export const get = (url, data = {}, options = {}) => {
  return request({
    url,
    data,
    method: 'GET',
    ...options
  });
};

export const post = (url, data = {}, options = {}) => {
  return request({
    url,
    data,
    method: 'POST',
    ...options
  });
};

export const put = (url, data = {}, options = {}) => {
  return request({
    url,
    data,
    method: 'PUT',
    ...options
  });
};

export const del = (url, data = {}, options = {}) => {
  return request({
    url,
    data,
    method: 'DELETE',
    ...options
  });
};

export default request;