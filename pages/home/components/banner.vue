<template>
  <view class="banner-container">
    <uni-swiper-dot
      class="uni-swiper-dot-box"
      @clickItem="clickItem"
      :info="bannerData"
      :current="current"
      mode="round"
    >
      <swiper class="swiper-box" @change="change" :current="swiperDotIndex">
        <swiper-item v-for="(item, index) in bannerData" :key="index">
          <view class="swiper-item">
            <image
              :src="item.cover"
              class="slogan-image"
              alt="slogan Logo"
            ></image>
          </view>
        </swiper-item>
      </swiper>
    </uni-swiper-dot>
  </view>
</template>

<script setup>
import { ref, onMounted } from "vue";
import {
		getAllBanners
	} from '@/http/banner';

const current = ref(0);
const swiperDotIndex = ref(0);
const bannerData = ref([])
const change = (e) => {
  current.value = e.detail.current;
};
const clickItem = (e) => {
  swiperDotIndex.value = e;
};
	// 获取banner数据
	const getBannersData = async () => {
		const response = await getAllBanners({})
		const res = response.data
		if (res.code == 200) {
			bannerData.value = res.data
		} else {
			uni.showToast({
				title: '网络错误',
				icon: 'none',
			});
		}
	}

	onMounted(() => {
		getBannersData()
	})
</script>

<style lang="scss" scoped>
.banner-container {
		margin: 20px 10px 0 10px;
    .swiper-item {
        display: flex;
        justify-content: center;
        height: 148px;
				overflow: hidden;
        .slogan-image {
            width: 100%;
            height: 100%;
            object-fit: cover;
						box-shadow: rgba(0, 0, 0, 0.08) 0px 0px 3px 1px;
						border-radius: 4px;
        }
    }
}
</style>
