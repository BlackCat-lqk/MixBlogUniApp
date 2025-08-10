"use strict";
const common_vendor = require("../../common/vendor.js");
const http_about = require("../../http/about.js");
if (!Array) {
  const _easycom_uni_tag2 = common_vendor.resolveComponent("uni-tag");
  _easycom_uni_tag2();
}
const _easycom_uni_tag = () => "../../uni_modules/uni-tag/components/uni-tag/uni-tag.js";
if (!Math) {
  _easycom_uni_tag();
}
const about1 = "https://m.mixblog.cn/uploads/weixin/about2.jpg";
const about2 = "https://m.mixblog.cn/uploads/weixin/about3.jpg";
const baseURL = "https://m.mixblog.cn";
const _sfc_main = {
  __name: "about",
  setup(__props) {
    const aboutData = common_vendor.reactive({
      intro: "",
      tags: "",
      cover: "",
      modules: [{ title: "", content: "", image: [] }]
    });
    const getAboutConfig = async () => {
      const params = {
        email: "",
        uId: ""
      };
      const response = await http_about.getAboutConfigApi(params);
      const res = response.data;
      if (res.code === 200) {
        aboutData.tags = res.data.tags;
        aboutData.cover = res.data.cover;
        aboutData.intro = res.data.intro;
        aboutData.modules = res.data.modules;
      } else {
        common_vendor.index.__f__("log", "at pages/about/about.vue:79", res.message);
      }
    };
    common_vendor.onMounted(() => {
      getAboutConfig();
    });
    return (_ctx, _cache) => {
      return {
        a: baseURL + aboutData.cover,
        b: common_vendor.f(aboutData.tags ? aboutData.tags.split(" ") : [], (tag, idx, i0) => {
          return {
            a: idx,
            b: "13a78ac6-0-" + i0,
            c: common_vendor.p({
              type: "primary",
              text: tag,
              inverted: true,
              circle: true
            })
          };
        }),
        c: common_vendor.t(aboutData.intro),
        d: common_vendor.f(aboutData.modules, (item, idx, i0) => {
          return common_vendor.e({
            a: common_vendor.t(item.title),
            b: common_vendor.t(item.content),
            c: idx == 0
          }, idx == 0 ? {
            d: about1,
            e: about2
          } : {}, {
            f: idx
          });
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-13a78ac6"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/about/about.js.map
