"use strict";
const common_vendor = require("../../../common/vendor.js");
const http_photoLibrary = require("../../../http/photoLibrary.js");
if (!Math) {
  ImageLibrary();
}
const ImageLibrary = () => "../../components/ImageLibrary.js";
const _sfc_main = {
  __name: "photo",
  setup(__props) {
    const photosData = common_vendor.ref([]);
    const gotoOhter = (val) => {
      common_vendor.index.navigateTo({
        url: "/pages/gallery/gallery"
      });
    };
    const getPhotoLibrary = async () => {
      const result = await http_photoLibrary.getPhotoLibraryApi({});
      const res = result.data;
      if (res.code == 200) {
        if (res.data.list.length <= 3) {
          photosData.value = res.data.list;
        } else {
          photosData.value = res.data.list.slice(0, 3);
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
      return {
        a: common_vendor.f(photosData.value, (item, idx, i0) => {
          return {
            a: "729199bc-0-" + i0,
            b: common_vendor.p({
              photosData: item
            }),
            c: idx
          };
        }),
        b: common_vendor.o(gotoOhter)
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-729199bc"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/home/components/photo.js.map
