import { defineStore } from 'pinia'

export const useSloganInfoStore = defineStore('sloganConfigInfo', {
  state: () => ({
    sloganConfig: {
      logoPicture: '',
      logoName: '',
      sloganTitle: '',
      sloganSub1: '',
      sloganSub2: '',
      cover: 'https://m.mixblog.cn/uploads/defalut/logo2024.webp',
    },
  }),
  actions: {
    setSloganConfig(val) {
      this.sloganConfig = val
    },
  },
  // persist: true,
	// #ifdef H5
	  persist: true,
	  // #endif
})