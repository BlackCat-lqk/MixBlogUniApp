<template>
  <view class="banner-container">
    <uni-swiper-dot
      class="uni-swiper-dot-box"
      @clickItem="clickItem"
      :info="info"
      :current="current"
      mode="round"
    >
      <swiper class="swiper-box" @change="change" :current="swiperDotIndex">
        <swiper-item v-for="(item, index) in info" :key="index">
          <view class="swiper-item">
            <image
              src="@/static/Github.svg"
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
import { ref } from "vue";

const current = ref(0);
const swiperDotIndex = ref(0);
const info = ref([
  {
    colorClass: "uni-bg-red",
    url: "https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/shuijiao.jpg",
    content: "内容 A",
  },
  {
    colorClass: "uni-bg-green",
    url: "https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/shuijiao.jpg",
    content: "内容 B",
  }
]);

const change = (e) => {
  current.value = e.detail.current;
};
const clickItem = (e) => {
  swiperDotIndex.value = e;
};
</script>

<style lang="scss" scoped>
.banner-container {
    background-color: #fff;
    margin-top: 20px;
    .swiper-item {
        display: flex;
        justify-content: center;
        height: 180px;
        .slogan-image {
            width: 100%;
            height: 100%;
            object-fit: contain;
        }
    }
}
</style>
