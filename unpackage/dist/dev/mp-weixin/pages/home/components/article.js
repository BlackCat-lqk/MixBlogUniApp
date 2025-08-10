"use strict";
const common_vendor = require("../../../common/vendor.js");
const http_blogArticle = require("../../../http/blogArticle.js");
if (!Math) {
  ArticleCard();
}
const ArticleCard = () => "../../components/ArticleCard.js";
const _sfc_main = {
  __name: "article",
  setup(__props) {
    const articleData = common_vendor.reactive({
      data: [],
      columns: 2
    });
    const gotoOhter = (val) => {
      common_vendor.index.navigateTo({
        url: "/pages/article/article"
      });
    };
    const getArticleData = async () => {
      const response = await http_blogArticle.getAllBlogArticleApi({});
      const res = response.data;
      if (res.code == 200) {
        if (res.data.list.length <= 3) {
          articleData.data = res.data.list;
        } else {
          articleData.data = res.data.list.slice(0, 3);
        }
      } else {
        common_vendor.index.showToast({
          title: "网络错误",
          icon: "none"
        });
      }
    };
    common_vendor.onMounted(() => {
      getArticleData();
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          articleData
        }),
        b: common_vendor.o(gotoOhter)
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-163e1bcf"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/home/components/article.js.map
