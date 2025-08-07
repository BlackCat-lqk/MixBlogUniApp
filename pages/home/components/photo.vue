<template>
  <view class="photo-box">
  	<view class="photo-title">图库</view>
  	<image-library></image-library>
  	<button class="more-button" type="primary">更多</button>
  </view>
</template>

<script setup>
	import { ref, reactive, onMounted } from 'vue'
	import ImageLibrary from '@/pages/components/ImageLibrary.vue';
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