"use strict";
const common_vendor = require("../../../common/vendor.js");
const http_banner = require("../../../http/banner.js");
if (!Array) {
  const _easycom_uni_swiper_dot2 = common_vendor.resolveComponent("uni-swiper-dot");
  _easycom_uni_swiper_dot2();
}
const _easycom_uni_swiper_dot = () => "../../../uni_modules/uni-swiper-dot/components/uni-swiper-dot/uni-swiper-dot.js";
if (!Math) {
  _easycom_uni_swiper_dot();
}
const baseURL = "https://m.mixblog.cn";
const _sfc_main = {
  __name: "banner",
  setup(__props) {
    const current = common_vendor.ref(0);
    const swiperDotIndex = common_vendor.ref(0);
    const bannerData = common_vendor.ref([]);
    const change = (e) => {
      current.value = e.detail.current;
    };
    const clickItem = (e) => {
      swiperDotIndex.value = e;
    };
    const getBannersData = async () => {
      const response = await http_banner.getAllBanners({});
      const res = response.data;
      if (res.code == 200) {
        bannerData.value = res.data;
      } else {
        common_vendor.index.showToast({
          title: "网络错误",
          icon: "none"
        });
      }
    };
    common_vendor.onMounted(() => {
      getBannersData();
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(bannerData.value, (item, index, i0) => {
          return {
            a: baseURL + item.cover,
            b: common_vendor.t(item.title),
            c: common_vendor.t(item.sub),
            d: common_vendor.t(item.introduction),
            e: common_vendor.t(item.mainBtnName),
            f: common_vendor.t(item.childBtnName),
            g: index
          };
        }),
        b: common_vendor.o(change),
        c: swiperDotIndex.value,
        d: common_vendor.o(clickItem),
        e: common_vendor.p({
          info: bannerData.value,
          current: current.value,
          mode: "round"
        })
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-22a63985"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/home/components/banner.js.map
