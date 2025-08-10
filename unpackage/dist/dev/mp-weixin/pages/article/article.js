"use strict";
const common_vendor = require("../../common/vendor.js");
const http_blogArticle = require("../../http/blogArticle.js");
if (!Math) {
  (ClassifyMeun + ArticleCard)();
}
const ArticleCard = () => "../components/ArticleCard.js";
const ClassifyMeun = () => "../components/ClassifyMeun.js";
const _sfc_main = {
  __name: "article",
  setup(__props) {
    const isClassify = common_vendor.ref(false);
    const articleData = common_vendor.reactive({
      data: [],
      columns: 2,
      deepData: []
    });
    const classify = common_vendor.reactive([{
      name: "全部",
      number: 0
    }]);
    const moreArticle = () => {
      articleData.data = articleData.deepData.slice(0, articleData.data.length + 6);
    };
    const handleClassify = (name) => {
      const listData = common_vendor._.cloneDeep(articleData.deepData);
      const filterData = listData.filter((item) => {
        return item.category === name;
      });
      if (name === "全部") {
        isClassify.value = false;
        articleData.data = listData.slice(0, 6);
      } else {
        isClassify.value = true;
        articleData.data = filterData;
      }
    };
    const getArticleData = async () => {
      const response = await http_blogArticle.getAllBlogArticleApi({});
      const res = response.data;
      if (res.code == 200) {
        const listData = res.data.list.filter((item) => item.status === "published");
        articleData.deepData = common_vendor._.cloneDeep(listData);
        classify[0].number = res.data.pagination.total;
        for (const key in res.data.stats.categories) {
          classify.push({
            name: key,
            number: res.data.stats.categories[key]
          });
        }
        articleData.data = listData.slice(0, 6);
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
      return common_vendor.e({
        a: common_vendor.o(handleClassify),
        b: common_vendor.p({
          classify
        }),
        c: common_vendor.p({
          articleData
        }),
        d: !isClassify.value
      }, !isClassify.value ? common_vendor.e({
        e: articleData.data.length < articleData.deepData.length
      }, articleData.data.length < articleData.deepData.length ? {
        f: common_vendor.o(moreArticle)
      } : {}) : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-33268ad9"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/article/article.js.map
