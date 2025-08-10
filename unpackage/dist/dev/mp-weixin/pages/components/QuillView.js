"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Math) {
  common_vendor.unref(common_vendor.QuillEditor)();
}
const _sfc_main = {
  __name: "QuillView",
  setup(__props) {
    common_vendor.Quill.register("modules/syntax", common_vendor.Syntax);
    const editorContent = common_vendor.ref("");
    const Options = {
      modules: {
        toolbar: false,
        // 隐藏工具栏
        syntax: {
          highlight: (text) => common_vendor.HighlightJS.highlightAuto(text).value
        }
      }
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          ["content-type"]: "html",
          content: editorContent.value,
          readonly: true,
          options: Options
        })
      };
    };
  }
};
wx.createComponent(_sfc_main);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/components/QuillView.js.map
