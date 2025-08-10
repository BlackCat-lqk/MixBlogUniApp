"use strict";
const common_vendor = require("../../../common/vendor.js");
const http_slogan = require("../../../http/slogan.js");
const stores_slogan = require("../../../stores/slogan.js");
const img1 = "https://m.mixblog.cn/uploads/weixin/Github.svg";
const img2 = "https://m.mixblog.cn/uploads/weixin/Blibli.svg";
const _sfc_main = {
  __name: "slogan",
  setup(__props) {
    const sloganStore = stores_slogan.useSloganInfoStore();
    const formValue = common_vendor.reactive({
      logoPicture: "",
      logoName: "",
      sloganTitle: "",
      sloganSub1: "",
      sloganSub2: "",
      cover: ""
    });
    const isNoDev = () => {
      common_vendor.index.showToast({
        title: "该功能移动端暂未上线，请使用客户端打开！",
        icon: "none"
      });
    };
    const getSloganConfig = async () => {
      const response = await http_slogan.getSloganApi({});
      const res = response.data;
      if (res.code == 200) {
        formValue.logoPicture = res.data.logoPicture;
        formValue.logoName = res.data.logoName;
        formValue.sloganTitle = res.data.sloganTitle;
        formValue.sloganSub1 = res.data.sloganSub1;
        formValue.sloganSub2 = res.data.sloganSub2;
        formValue.cover = res.data.cover;
        sloganStore.setSloganConfig(formValue);
      } else {
        common_vendor.index.showToast({
          title: "网络错误",
          icon: "none"
        });
      }
    };
    common_vendor.onMounted(() => {
      getSloganConfig();
    });
    return (_ctx, _cache) => {
      return {
        a: "https://m.mixblog.cn" + formValue.cover,
        b: common_vendor.t(formValue.sloganTitle),
        c: common_vendor.t(formValue.sloganSub1),
        d: common_vendor.t(formValue.sloganSub2),
        e: img1,
        f: img2,
        g: common_vendor.o(isNoDev)
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-18a0a9d0"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/home/components/slogan.js.map
