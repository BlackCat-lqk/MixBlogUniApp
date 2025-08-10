"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_publickFun = require("../../utils/publickFun.js");
if (!Array) {
  const _easycom_uni_tag2 = common_vendor.resolveComponent("uni-tag");
  _easycom_uni_tag2();
}
const _easycom_uni_tag = () => "../../uni_modules/uni-tag/components/uni-tag/uni-tag.js";
if (!Math) {
  (_easycom_uni_tag + PopupContent)();
}
const PopupContent = () => "./PopupContent.js";
const likes = "https://m.mixblog.cn/uploads/weixin/likes.svg";
const views = "https://m.mixblog.cn/uploads/weixin/views.svg";
const comments = "https://m.mixblog.cn/uploads/weixin/comment.svg";
const baseURL = "https://m.mixblog.cn";
const _sfc_main = {
  __name: "ArticleCard",
  props: {
    articleData: {
      type: Object,
      default: () => {
      }
    }
  },
  setup(__props) {
    let articleDetail = common_vendor.reactive({
      _id: "",
      title: "",
      content: "",
      intro: "",
      category: "",
      updatedAt: "",
      tags: [],
      comments: [],
      likes: [],
      views: []
    });
    const props = __props;
    const popup = common_vendor.ref(null);
    const countPopup = common_vendor.ref(0);
    const articleClick = (data) => {
      articleDetail = data;
      countPopup.value++;
      popup.value.open();
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(props.articleData.data, (item, idx, i0) => {
          return {
            a: baseURL + item.cover,
            b: common_vendor.t(item.title),
            c: common_vendor.t(common_vendor.unref(utils_publickFun._formatTime)(item.updatedAt).date),
            d: common_vendor.t(item.intro),
            e: "c9c49269-0-" + i0,
            f: common_vendor.p({
              text: item.category,
              type: "primary",
              circle: true
            }),
            g: common_vendor.f(item.tags, (tag, idx2, i1) => {
              return {
                a: idx2,
                b: "c9c49269-1-" + i0 + "-" + i1,
                c: common_vendor.p({
                  circle: true,
                  type: "primary",
                  text: tag,
                  circle: true,
                  inverted: true,
                  size: "small"
                })
              };
            }),
            h: common_vendor.t(item.likes.length),
            i: common_vendor.t(item.views.length),
            j: common_vendor.t(item.comments.length),
            k: idx,
            l: common_vendor.o(($event) => articleClick(item), idx)
          };
        }),
        b: likes,
        c: views,
        d: comments,
        e: common_vendor.sr(popup, "c9c49269-2", {
          "k": "popup"
        }),
        f: common_vendor.p({
          popupData: common_vendor.unref(articleDetail),
          count: countPopup.value
        }),
        g: "repeat(" + props.articleData.columns + ", 1fr)"
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-c9c49269"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/components/ArticleCard.js.map
