"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_uni_grid_item2 = common_vendor.resolveComponent("uni-grid-item");
  const _easycom_uni_grid2 = common_vendor.resolveComponent("uni-grid");
  const _easycom_uni_section2 = common_vendor.resolveComponent("uni-section");
  const _easycom_uni_link2 = common_vendor.resolveComponent("uni-link");
  (_easycom_uni_grid_item2 + _easycom_uni_grid2 + _easycom_uni_section2 + _easycom_uni_link2)();
}
const _easycom_uni_grid_item = () => "../../uni_modules/uni-grid/components/uni-grid-item/uni-grid-item.js";
const _easycom_uni_grid = () => "../../uni_modules/uni-grid/components/uni-grid/uni-grid.js";
const _easycom_uni_section = () => "../../uni_modules/uni-section/components/uni-section/uni-section.js";
const _easycom_uni_link = () => "../../uni_modules/uni-link/components/uni-link/uni-link.js";
if (!Math) {
  (_easycom_uni_grid_item + _easycom_uni_grid + _easycom_uni_section + _easycom_uni_link)();
}
const _sfc_main = {
  __name: "Footer",
  setup(__props) {
    const supportData = [
      {
        img: "https://m.mixblog.cn/uploads/weixin/footer/vue3.svg",
        url: "https://v3.cn.vuejs.org/",
        alt: "vue3"
      },
      {
        img: "https://m.mixblog.cn/uploads/weixin/footer/typescript.svg",
        url: "https://www.typescriptlang.org/",
        alt: "typescript"
      },
      {
        img: "https://m.mixblog.cn/uploads/weixin/footer/vite.svg",
        url: "https://cn.vitejs.dev/",
        alt: "vitejs"
      },
      {
        img: "https://m.mixblog.cn/uploads/weixin/footer/Echarts.svg",
        url: "https://echarts.apache.org/index.html",
        alt: "echarts"
      },
      {
        img: "https://m.mixblog.cn/uploads/weixin/footer/vant.svg",
        url: "https://vant-ui.github.io/vant/",
        alt: "vant"
      },
      {
        img: "https://m.mixblog.cn/uploads/weixin/footer/JavaScript.svg",
        url: "https://www.javascript.com/",
        alt: "javascript"
      },
      {
        img: "https://m.mixblog.cn/uploads/weixin/footer/Github.svg",
        url: "https://github.com/",
        alt: "github"
      },
      {
        img: "https://m.mixblog.cn/uploads/weixin/footer/naive.svg",
        url: "https://www.naiveui.com/",
        alt: "naive ui"
      },
      {
        img: "https://m.mixblog.cn/uploads/weixin/footer/pinia.svg",
        url: "https://pinia.vuejs.org/",
        alt: "pinia"
      },
      {
        img: "https://m.mixblog.cn/uploads/weixin/footer/Nodejs.svg",
        url: "https://nodejs.org/",
        alt: "nodejs"
      },
      {
        img: "https://m.mixblog.cn/uploads/weixin/footer/express.svg",
        url: "https://expressjs.com/",
        alt: "express"
      },
      {
        img: "https://m.mixblog.cn/uploads/weixin/footer/scss.svg",
        url: "https://sass-lang.com/",
        alt: "scss"
      },
      {
        img: "https://m.mixblog.cn/uploads/weixin/footer/deepseek.svg",
        url: "https://www.deepseek.com/",
        alt: "deepseek"
      },
      {
        img: "https://m.mixblog.cn/uploads/weixin/footer/mongodb.svg",
        url: "https://www.mongodb.com/",
        alt: "mongodb"
      },
      {
        img: "https://m.mixblog.cn/uploads/weixin/footer/esLint.svg",
        url: "https://eslint.org/",
        alt: "eslint"
      },
      {
        img: "https://m.mixblog.cn/uploads/weixin/footer/unocss.svg",
        url: "https://unocss.dev/",
        alt: "unocss"
      },
      {
        img: "https://m.mixblog.cn/uploads/weixin/footer/vuebits.svg",
        url: "https://vue-bits.dev/",
        alt: "vuebits"
      },
      {
        img: "https://m.mixblog.cn/uploads/weixin/footer/quill.svg",
        url: "https://quilljs.com/",
        alt: "quill"
      },
      {
        img: "https://m.mixblog.cn/uploads/weixin/footer/oxlint.svg",
        url: "https://oxc.rs/docs/guide/usage/linter/config.html",
        alt: "oxlint"
      },
      {
        img: "https://m.mixblog.cn/uploads/weixin/footer/bt.svg",
        url: "https://www.bt.cn/new/index.html",
        alt: "BT.CN"
      }
    ];
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(supportData.slice(0, 4), (item, index, i0) => {
          return {
            a: item.img,
            b: item.alt,
            c: index,
            d: "11f0d147-2-" + i0 + ",11f0d147-1",
            e: common_vendor.p({
              index
            })
          };
        }),
        b: common_vendor.p({
          column: 4,
          highlight: true
        }),
        c: common_vendor.f(supportData.slice(4, 8), (item, index, i0) => {
          return {
            a: item.img,
            b: item.alt,
            c: index,
            d: "11f0d147-4-" + i0 + ",11f0d147-3",
            e: common_vendor.p({
              index
            })
          };
        }),
        d: common_vendor.p({
          column: 4,
          highlight: true
        }),
        e: common_vendor.f(supportData.slice(8, 12), (item, index, i0) => {
          return {
            a: item.img,
            b: item.alt,
            c: index,
            d: "11f0d147-6-" + i0 + ",11f0d147-5",
            e: common_vendor.p({
              index
            })
          };
        }),
        f: common_vendor.p({
          column: 4,
          highlight: true
        }),
        g: common_vendor.f(supportData.slice(12, 16), (item, index, i0) => {
          return {
            a: item.img,
            b: item.alt,
            c: index,
            d: "11f0d147-8-" + i0 + ",11f0d147-7",
            e: common_vendor.p({
              index
            })
          };
        }),
        h: common_vendor.p({
          column: 4,
          highlight: true
        }),
        i: common_vendor.f(supportData.slice(16, 20), (item, index, i0) => {
          return {
            a: item.img,
            b: item.alt,
            c: index,
            d: "11f0d147-10-" + i0 + ",11f0d147-9",
            e: common_vendor.p({
              index
            })
          };
        }),
        j: common_vendor.p({
          column: 4,
          highlight: true
        }),
        k: common_vendor.p({
          title: "技术支持",
          type: "line",
          padding: true
        }),
        l: common_vendor.p({
          href: "https://beian.miit.gov.cn/#/Integrated/index"
        })
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-11f0d147"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/components/Footer.js.map
