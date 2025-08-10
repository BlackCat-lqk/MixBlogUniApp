"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "login",
  setup(__props) {
    const loginForm = common_vendor.ref({
      username: "",
      password: ""
    });
    const handleLogin = () => {
      common_vendor.index.__f__("log", "at pages/login/login.vue:29", "登录信息:", loginForm.value);
    };
    return (_ctx, _cache) => {
      return {
        a: loginForm.value.username,
        b: common_vendor.o(($event) => loginForm.value.username = $event.detail.value),
        c: loginForm.value.password,
        d: common_vendor.o(($event) => loginForm.value.password = $event.detail.value),
        e: common_vendor.o(handleLogin)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-e4e4508d"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/login/login.js.map
