"use strict";
const common_vendor = require("../common/vendor.js");
const useSloganInfoStore = common_vendor.defineStore("sloganConfigInfo", {
  state: () => ({
    sloganConfig: {
      logoPicture: "",
      logoName: "",
      sloganTitle: "",
      sloganSub1: "",
      sloganSub2: "",
      cover: "https://m.mixblog.cn/uploads/defalut/logo2024.webp"
    }
  }),
  actions: {
    setSloganConfig(val) {
      this.sloganConfig = val;
    }
  }
  // persist: true,
});
exports.useSloganInfoStore = useSloganInfoStore;
//# sourceMappingURL=../../.sourcemap/mp-weixin/stores/slogan.js.map
