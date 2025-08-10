"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_publickFun = require("../../utils/publickFun.js");
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  (_easycom_uni_icons2 + _easycom_uni_popup2)();
}
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_uni_popup = () => "../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
if (!Math) {
  (_easycom_uni_icons + _easycom_uni_popup)();
}
const baseURL = "https://m.mixblog.cn";
const likes = "https://m.mixblog.cn/uploads/weixin/likes.svg";
const views = "https://m.mixblog.cn/uploads/weixin/views.svg";
const comments = "https://m.mixblog.cn/uploads/weixin/comment.svg";
const _sfc_main = {
  __name: "PopupPhoto",
  props: {
    popupData: Object,
    showModel: Boolean,
    count: Number
  },
  emits: ["update:showModel"],
  setup(__props, { expose: __expose, emit: __emit }) {
    const emit = __emit;
    const popup = common_vendor.ref(null);
    const open = () => {
      popup.value.open();
    };
    const close = () => {
      emit("update:showModel", false);
      popup.value.close();
    };
    __expose({
      open,
      close
    });
    const props = __props;
    return (_ctx, _cache) => {
      var _a, _b, _c;
      return {
        a: common_vendor.t(props.popupData.title),
        b: common_vendor.o(close),
        c: common_vendor.p({
          type: "close",
          size: "24",
          color: "#999"
        }),
        d: common_vendor.t(common_vendor.unref(utils_publickFun._formatTime)(props.popupData.updatedAt).date),
        e: likes,
        f: common_vendor.t(((_a = props.popupData.likes) == null ? void 0 : _a.length) || 0),
        g: views,
        h: common_vendor.t(((_b = props.popupData.views) == null ? void 0 : _b.length) || 0),
        i: comments,
        j: common_vendor.t(((_c = props.popupData.comments) == null ? void 0 : _c.length) || 0),
        k: common_vendor.t(props.popupData.content),
        l: common_vendor.f(props.popupData.photos, (item, idx, i0) => {
          return {
            a: idx,
            b: baseURL + item
          };
        }),
        m: common_vendor.sr(popup, "70145d1c-0", {
          "k": "popup"
        }),
        n: common_vendor.o(close),
        o: common_vendor.p({
          type: "bottom",
          ["mask-click"]: true
        })
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-70145d1c"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/components/PopupPhoto.js.map
