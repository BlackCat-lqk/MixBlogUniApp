"use strict";
const common_vendor = require("../../common/vendor.js");
const http_photoLibrary = require("../../http/photoLibrary.js");
if (!Math) {
  (ClassifyMeun + ImageLibrary)();
}
const ImageLibrary = () => "../components/ImageLibrary.js";
const ClassifyMeun = () => "../components/ClassifyMeun.js";
const _sfc_main = {
  __name: "gallery",
  setup(__props) {
    const photosData = common_vendor.ref([]);
    const photosAllData = common_vendor.ref([]);
    const isClassify = common_vendor.ref(false);
    const classify = common_vendor.reactive([{
      name: "全部",
      number: 0
    }]);
    const moreArticle = () => {
      photosData.value = photosAllData.value.slice(0, photosData.value.length + 6);
    };
    const handleClassify = (name) => {
      common_vendor.index.__f__("log", "at pages/gallery/gallery.vue:39", name);
      const listData = common_vendor._.cloneDeep(photosAllData.value);
      common_vendor.index.__f__("log", "at pages/gallery/gallery.vue:41", listData);
      const filterData = listData.filter((item) => {
        return item.category === name;
      });
      if (name === "全部") {
        isClassify.value = false;
        photosData.value = listData.slice(0, 6);
      } else {
        isClassify.value = true;
        photosData.value = filterData;
      }
    };
    const getPhotoLibrary = async () => {
      const result = await http_photoLibrary.getPhotoLibraryApi({});
      const res = result.data;
      if (res.code == 200) {
        photosAllData.value = common_vendor._.cloneDeep(res.data.list);
        photosData.value = res.data.list;
        classify[0].number = res.data.pagination.total;
        for (const key in res.data.stats.categories) {
          classify.push({
            name: key,
            number: res.data.stats.categories[key]
          });
        }
      } else {
        common_vendor.index.showToast({
          title: "网络错误",
          icon: "none"
        });
      }
    };
    common_vendor.onMounted(() => {
      getPhotoLibrary();
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.o(handleClassify),
        b: common_vendor.p({
          classify
        }),
        c: common_vendor.f(photosData.value, (item, idx, i0) => {
          return {
            a: "ff88f784-1-" + i0,
            b: common_vendor.p({
              photosData: item
            }),
            c: idx
          };
        }),
        d: !isClassify.value
      }, !isClassify.value ? common_vendor.e({
        e: photosData.value.length < photosAllData.value.length
      }, photosData.value.length < photosAllData.value.length ? {
        f: common_vendor.o(moreArticle)
      } : {}) : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-ff88f784"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/gallery/gallery.js.map
