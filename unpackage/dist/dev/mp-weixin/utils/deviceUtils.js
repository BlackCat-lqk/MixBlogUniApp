"use strict";
function getDeviceType() {
  const ua = navigator.userAgent;
  if (/Android/.test(ua)) {
    return "Android";
  } else if (/iPhone|iPad|iPod/.test(ua)) {
    return "iOS";
  } else if (/Windows/.test(ua)) {
    return "Windows";
  } else if (/Macintosh/.test(ua)) {
    return "Mac";
  } else {
    return "Unknown";
  }
}
exports.getDeviceType = getDeviceType;
//# sourceMappingURL=../../.sourcemap/mp-weixin/utils/deviceUtils.js.map
