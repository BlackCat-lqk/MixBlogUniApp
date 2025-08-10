"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "register",
  setup(__props) {
    const registerForm = common_vendor.ref({
      username: "",
      email: "",
      password: "",
      confirmPassword: ""
    });
    const handleRegister = () => {
      common_vendor.index.__f__("log", "at pages/register/register.vue:31", "注册信息:", registerForm.value);
      if (registerForm.value.password !== registerForm.value.confirmPassword) {
        common_vendor.index.__f__("log", "at pages/register/register.vue:34", "两次输入的密码不一致");
        return;
      }
    };
    return (_ctx, _cache) => {
      return {
        a: registerForm.value.username,
        b: common_vendor.o(($event) => registerForm.value.username = $event.detail.value),
        c: registerForm.value.email,
        d: common_vendor.o(($event) => registerForm.value.email = $event.detail.value),
        e: registerForm.value.password,
        f: common_vendor.o(($event) => registerForm.value.password = $event.detail.value),
        g: registerForm.value.confirmPassword,
        h: common_vendor.o(($event) => registerForm.value.confirmPassword = $event.detail.value),
        i: common_vendor.o(handleRegister)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-bac4a35d"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/register/register.js.map
