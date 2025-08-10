"use strict";
if (!Math) {
  (HeaderNav + HomeIndex + FooterView)();
}
const HeaderNav = () => "../components/HeaderNav.js";
const HomeIndex = () => "../home/index.js";
const FooterView = () => "../components/Footer.js";
const _sfc_main = {
  __name: "index",
  setup(__props) {
    return (_ctx, _cache) => {
      return {};
    };
  }
};
wx.createPage(_sfc_main);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/index/index.js.map
