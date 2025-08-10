"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  _easycom_uni_icons2();
}
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
if (!Math) {
  _easycom_uni_icons();
}
const _sfc_main = {
  __name: "BackToTop",
  setup(__props) {
    const isVisible = common_vendor.ref(false);
    const handleScroll = () => {
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop || 0;
      isVisible.value = scrollTop > 300;
    };
    const scrollToTop = () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    };
    common_vendor.onMounted(() => {
      window.addEventListener("scroll", handleScroll);
    });
    common_vendor.onUnmounted(() => {
      window.removeEventListener("scroll", handleScroll);
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          type: "arrow-up",
          size: "24",
          color: "#ffffff"
        }),
        b: isVisible.value ? 1 : "",
        c: common_vendor.o(scrollToTop)
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-8e4d717f"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/components/BackToTop.js.map
