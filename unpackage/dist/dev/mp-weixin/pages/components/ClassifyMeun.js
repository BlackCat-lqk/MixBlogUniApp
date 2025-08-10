"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "ClassifyMeun",
  props: {
    classify: {}
  },
  emits: ["classifyEmit"],
  setup(__props, { emit: __emit }) {
    const isSelected = common_vendor.ref("全部");
    const emit = __emit;
    const classifyClick = (name) => {
      emit("classifyEmit", name);
      isSelected.value = name;
    };
    const props = __props;
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(props.classify, (item, idx, i0) => {
          return {
            a: common_vendor.t(item.name),
            b: common_vendor.t(item.number),
            c: common_vendor.n(isSelected.value == item.name ? "active-classify-item" : "classify-item"),
            d: idx,
            e: common_vendor.o(($event) => classifyClick(item.name), idx)
          };
        })
      };
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-338ddbfa"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/components/ClassifyMeun.js.map
