"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_publickFun = require("../../utils/publickFun.js");
if (!Array) {
  const _easycom_uni_card2 = common_vendor.resolveComponent("uni-card");
  _easycom_uni_card2();
}
const _easycom_uni_card = () => "../../uni_modules/uni-card/components/uni-card/uni-card.js";
if (!Math) {
  _easycom_uni_card();
}
const baseURL = "https://m.mixblog.cn";
const _sfc_main = {
  __name: "NotesCard",
  props: {
    notesDetail: {
      type: Object,
      default: () => ({})
    }
  },
  setup(__props) {
    const props = __props;
    common_vendor.index.__f__("log", "at pages/components/NotesCard.vue:39", props.notesDetail);
    const weatherIconsURLs = {
      cloudy: "https://m.mixblog.cn/uploads/weixin/Weather/cloudy.svg",
      overcast: "https://m.mixblog.cn/uploads/weixin/Weather/overcast.svg",
      pour: "https://m.mixblog.cn/uploads/weixin/Weather/pour.svg",
      rain: "https://m.mixblog.cn/uploads/weixin/Weather/rain.svg",
      snow: "https://m.mixblog.cn/uploads/weixin/Weather/snow.svg",
      sun: "https://m.mixblog.cn/uploads/weixin/Weather/sun.svg",
      thunderstorm: "https://m.mixblog.cn/uploads/weixin/Weather/thunderstorm.svg",
      wind: "https://m.mixblog.cn/uploads/weixin/Weather/wind.svg"
    };
    const hasNote = common_vendor.ref(true);
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: hasNote.value
      }, hasNote.value ? {
        b: common_vendor.f(props.notesDetail, (item, idx, i0) => {
          return {
            a: common_vendor.t(item.title),
            b: common_vendor.t(common_vendor.unref(utils_publickFun._formatTime)(item.updatedAt).time),
            c: weatherIconsURLs[item.weather],
            d: common_vendor.t(item.content),
            e: baseURL + item.cover,
            f: idx,
            g: "1da81c5d-0-" + i0
          };
        })
      } : {});
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-1da81c5d"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/components/NotesCard.js.map
