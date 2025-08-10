"use strict";
const common_vendor = require("../../../common/vendor.js");
const http_notes = require("../../../http/notes.js");
if (!Math) {
  NotesCard();
}
const NotesCard = () => "../../components/NotesCard.js";
const _sfc_main = {
  __name: "notes",
  setup(__props) {
    const notesDetail = common_vendor.ref({
      id: "",
      title: "",
      content: "",
      updatedAt: "",
      weather: "",
      cover: ""
    });
    const gotoOhter = (val) => {
      common_vendor.index.navigateTo({
        url: "/pages/notes/notes"
      });
    };
    const getNotesData = async () => {
      const result = await http_notes.getNotesApi({});
      const res = result.data;
      if (res.code == 200) {
        if (res.data.length <= 2) {
          notesDetail.value = res.data;
        } else {
          notesDetail.value = res.data.slice(0, 2);
        }
      } else {
        common_vendor.index.showToast({
          title: "网络错误",
          icon: "none"
        });
      }
    };
    common_vendor.onMounted(() => {
      getNotesData();
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          notesDetail: notesDetail.value
        }),
        b: common_vendor.o(gotoOhter)
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-1e622951"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/home/components/notes.js.map
