<template>
  <view class="photo-box">
  	<view class="photo-title">图库</view>
		<view v-for="(item, idx) in photosData" :key="idx">
			<image-library :photosData="item"></image-library>
		</view>
  	
  	<button class="more-button" type="primary" @click="gotoOhter">更多</button>
  </view>
</template>

<script setup>
	import { ref, reactive, onMounted } from 'vue'
	import ImageLibrary from '@/pages/components/ImageLibrary.vue';
	import { getPhotoLibraryApi } from '@/http/photoLibrary';
	
	const photosData = ref([])
	const gotoOhter = (val) => {
		uni.navigateTo({
			url: '/pages/gallery/gallery'
		})
	}
	// 获取图库数据
	const getPhotoLibrary = async () => {
		const result = await getPhotoLibraryApi({})
		const res = result.data
		if(res.code == 200){
			if(res.data.list.length <= 3){
				photosData.value = res.data.list
			}else {
					photosData.value = res.data.list.slice(0,3)
			}
		}else {
			uni.showToast({
			       title: '网络错误',
			       icon: 'none',
			     });
		}
	}
	
	onMounted(() => {
		getPhotoLibrary()
	})
	
</script>

<style lang="scss" scoped>
	.photo-title {
		font-size: 1rem;
		font-weight: 600;
		padding-left: 15px;
	}
	.more-button{
		margin-top: 20px;
		width: 60px;
		height: 34px;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 0.8rem;
	}
</style>