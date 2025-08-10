<template>
  <view class="banner-container">
    <uni-swiper-dot
      class="uni-swiper-dot-box"
      @clickItem="clickItem"
      :info="bannerData"
      :current="current"
      mode="round"
    >
      <swiper class="swiper-box" @change="change" :current="swiperDotIndex" indicator-dots autoplay interval="5000" duration="500">
        <swiper-item v-for="(item, index) in bannerData" :key="index">
          <view class="swiper-item">
            <image
              :src="baseURL + item.cover"
              class="slogan-image"
              alt="slogan Logo"
            ></image>
						<view class="banner-info-box">
							<text class="banner-info-title">{{ item.title }}</text>
							<text>{{ item.sub }}</text>
							<text>{{ item.introduction }}</text>
							<view class="btn-banner-info">
								<button>{{item.mainBtnName}}</button>
								<button>{{item.childBtnName}}</button>
							</view>
						</view>
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
const baseURL = 'https://m.mixblog.cn'
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
		:deep(.uni-swiper-item) {
			position: relative;
			.banner-info-box {
				position: absolute;
				left: 0;
				top: 0;
			}
		}
    .swiper-item {
        display: flex;
        justify-content: center;
        height: 148px;
				overflow: hidden;
				border-radius: 4px;
				background: linear-gradient(to right, rgb(201, 214, 255) 0%, rgba(226, 226, 226, 0) 40%, rgba(182, 251, 255, 0) 60%, rgba(182, 251, 255, .5) 100%);
				box-shadow: rgba(0, 0, 0, 0.08) 0px 0px 5px 6px;
				position: relative;
				.banner-info-box {
					position: absolute;
					left: 1%;
					bottom: 20%;
					display: flex;
					flex-direction: column;
					gap: 4px;
					z-index: 1;
					.banner-info-title{
						font-size: 18px;
						font-weight: 600;
					}
					.btn-banner-info{
						display: flex;
						z-index: 9;
						button {
							height: 32px;
							display: flex;
							align-items: center;
							justify-content: center;
							background-color: #007aff;
							color: #fff;
							margin-left: 0;
							z-index: 9;
						}
					}
				}
        .slogan-image {
            width: 100%;
            height: 100%;
            object-fit: cover;
						box-shadow: rgba(0, 0, 0, 0.08) 0px 0px 3px 1px;
						border-radius: 4px;
						position: absolute;
						z-index: -1;
        }
    }
}
</style>
