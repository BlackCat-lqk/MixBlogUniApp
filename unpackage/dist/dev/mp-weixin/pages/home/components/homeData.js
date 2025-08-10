"use strict";
const common_vendor = require("../../../common/vendor.js");
const http_visit = require("../../../http/visit.js");
const _sfc_main = {
  __name: "homeData",
  setup(__props) {
    const dataList = common_vendor.ref([]);
    const getVisitStats = async () => {
      const result = await http_visit.getVisitStatsApi({});
      const res = result.data;
      if (res.code == 200) {
        dataList.value = res.data;
      } else {
        common_vendor.index.showToast({
          title: "网络错误",
          icon: "none"
        });
      }
    };
    common_vendor.onMounted(() => {
      getVisitStats();
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.t(dataList.value.totalCount),
        b: common_vendor.t(dataList.value.todayCount)
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-e0c070db"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/home/components/homeData.js.map
