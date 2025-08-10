"use strict";
const common_vendor = require("../../common/vendor.js");
const http_notes = require("../../http/notes.js");
const utils_publickFun = require("../../utils/publickFun.js");
if (!Array) {
  const _easycom_uni_calendar2 = common_vendor.resolveComponent("uni-calendar");
  _easycom_uni_calendar2();
}
const _easycom_uni_calendar = () => "../../uni_modules/uni-calendar/components/uni-calendar/uni-calendar.js";
if (!Math) {
  (_easycom_uni_calendar + NotesCard)();
}
const NotesCard = () => "../components/NotesCard.js";
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
    const notesAllDetail = common_vendor.ref({
      id: "",
      title: "",
      content: "",
      updatedAt: "",
      weather: "",
      cover: ""
    });
    const selected = common_vendor.ref([]);
    const change = (e) => {
      const listData = common_vendor._.cloneDeep(notesAllDetail.value);
      notesDetail.value = listData.filter((item) => {
        return utils_publickFun._formatTime(item.updatedAt).date == e.fulldate;
      });
    };
    const getNotesData = async () => {
      const result = await http_notes.getNotesApi({});
      const res = result.data;
      if (res.code == 200) {
        notesDetail.value = res.data;
        notesAllDetail.value = common_vendor._.cloneDeep(res.data);
        selected.value = [];
        res.data.map((item) => {
          selected.value.push({
            date: utils_publickFun._formatTime(item.updatedAt).date,
            info: "日记"
          });
        });
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
      return common_vendor.e({
        a: common_vendor.o(change),
        b: common_vendor.p({
          selected: selected.value,
          showMonth: false
        }),
        c: common_vendor.p({
          notesDetail: notesDetail.value
        }),
        d: notesDetail.value.length < 1
      }, notesDetail.value.length < 1 ? {} : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-cc7fb8d7"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/notes/notes.js.map
