"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_publickFun = require("../../utils/publickFun.js");
if (!Math) {
  PopupContent();
}
const PopupContent = () => "./PopupPhoto.js";
const likes = "https://m.mixblog.cn/uploads/weixin/likes.svg";
const views = "https://m.mixblog.cn/uploads/weixin/views.svg";
const comments = "https://m.mixblog.cn/uploads/weixin/comment.svg";
const baseURL = "https://m.mixblog.cn";
const _sfc_main = {
  __name: "ImageLibrary",
  props: {
    photosData: {
      type: Object,
      default: () => {
      }
    }
  },
  setup(__props) {
    const props = __props;
    let photoDetail = common_vendor.reactive([]);
    const popup = common_vendor.ref(null);
    const countPopup = common_vendor.ref(0);
    const photoClick = () => {
      photoDetail = props.photosData;
      countPopup.value++;
      popup.value.open();
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.t(props.photosData.photos.length),
        b: common_vendor.t(props.photosData.title),
        c: common_vendor.t(common_vendor.unref(utils_publickFun._formatTime)(props.photosData.updatedAt).date),
        d: likes,
        e: common_vendor.t(props.photosData.likes.length),
        f: views,
        g: common_vendor.t(props.photosData.views.length),
        h: comments,
        i: common_vendor.t(props.photosData.comments.length),
        j: common_vendor.t(props.photosData.content),
        k: "url(" + baseURL + props.photosData.photos[0] + ")",
        l: common_vendor.sr(popup, "c4a32b20-0", {
          "k": "popup"
        }),
        m: common_vendor.p({
          popupData: common_vendor.unref(photoDetail),
          count: countPopup.value
        }),
        n: common_vendor.o(photoClick)
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-c4a32b20"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/components/ImageLibrary.js.map
