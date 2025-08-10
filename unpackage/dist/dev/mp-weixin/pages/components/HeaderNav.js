"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  _easycom_uni_popup2();
}
const _easycom_uni_popup = () => "../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
if (!Math) {
  _easycom_uni_popup();
}
const _sfc_main = {
  __name: "HeaderNav",
  setup(__props) {
    const popup = common_vendor.ref(null);
    const openMenu = () => {
      popup.value.open();
    };
    const gotoOhter = (val) => {
      popup.value.close();
      common_vendor.index.navigateTo({
        url: val
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(($event) => gotoOhter("/pages/index/index")),
        b: common_vendor.o(($event) => gotoOhter("/pages/article/article")),
        c: common_vendor.o(($event) => gotoOhter("/pages/gallery/gallery")),
        d: common_vendor.o(($event) => gotoOhter("/pages/notes/notes")),
        e: common_vendor.o(($event) => gotoOhter("/pages/about/about")),
        f: common_vendor.o(openMenu),
        g: common_vendor.o(($event) => gotoOhter("/pages/login/login")),
        h: common_vendor.sr(popup, "1e05cb34-0", {
          "k": "popup"
        }),
        i: common_vendor.p({
          type: "top",
          ["mask-click"]: true
        })
      };
    };
  }
};
wx.createComponent(_sfc_main);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/components/HeaderNav.js.map
