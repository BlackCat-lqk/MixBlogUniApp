"use strict";
const common_vendor = require("../../common/vendor.js");
const http_visit = require("../../http/visit.js");
if (!Array) {
  const _easycom_uni_notice_bar2 = common_vendor.resolveComponent("uni-notice-bar");
  _easycom_uni_notice_bar2();
}
const _easycom_uni_notice_bar = () => "../../uni_modules/uni-notice-bar/components/uni-notice-bar/uni-notice-bar.js";
if (!Math) {
  (_easycom_uni_notice_bar + SloganView + BannerView + HomeData + ArticleView + NotesView + PhotoView)();
}
const SloganView = () => "./components/slogan.js";
const BannerView = () => "./components/banner.js";
const HomeData = () => "./components/homeData.js";
const ArticleView = () => "./components/article.js";
const NotesView = () => "./components/notes.js";
const PhotoView = () => "./components/photo.js";
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const recordVisit = async () => {
      const res = await http_visit.getVisitorIpApi();
      const params = {
        userAgent: "iPhone",
        ipAddress: res.data.ip,
        ...res.data
      };
      const response = await http_visit.recordVisitApi(params);
      const result = response.data;
      if (result.code === 200) {
        return;
      } else {
        return;
      }
    };
    common_vendor.onMounted(() => {
      recordVisit();
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          showIcon: true,
          showClose: true,
          single: true,
          text: "PC客户端打开解锁更好的体验和更多的功能"
        })
      };
    };
  }
};
wx.createComponent(_sfc_main);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/home/index.js.map
