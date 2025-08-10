<template>
	<view class="container">
		<view class="navbar">
			<view class="nav-left">
				<image class="logo" src="https://m.mixblog.cn/uploads/defalut/logo-transparent.webp" mode="aspectFit"></image>
			</view>
			<view class="nav-center">
				<text class="nav-item" @click="gotoOhter('/pages/index/index')">首页</text>
				<text class="nav-item" @click="gotoOhter('/pages/article/article')">文章</text>
				<text class="nav-item" @click="gotoOhter('/pages/gallery/gallery')">图库</text>
				<text class="nav-item" @click="gotoOhter('/pages/notes/notes')">随记</text>
				<text class="nav-item" @click="gotoOhter('/pages/about/about')">关于</text>
			</view>
			<view class="nav-right">
				<view class="customicons more-icon">
					<image class="logo" @click="openMenu" src="https://m.mixblog.cn/uploads/weixin/moreiconfont.svg"></image>
				</view>
			</view>
		</view>
		<uni-popup ref="popup" type="top" :mask-click="true">
			<view class="popup-menu">
				<view class="menu-item" @click="gotoOhter('/pages/login/login')">去登录</view>
			</view>
		</uni-popup>
	</view>
</template>

<script setup>
	import { ref } from 'vue'
	
	const popup = ref(null)
	const openMenu = () => {
		popup.value.open()
	}
	
	const gotoOhter = (val) => {
		popup.value.close()
		uni.navigateTo({
			url: val
		})
	}
</script>

<style>
	.container {
		height: 100%;
		background-color: #f4f2ec;
		display: flex;
		flex-direction: column;
	}
	
	.navbar {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		height: 44px;
		padding: 0 10px;
		background-color: #ffffff;
		border-bottom: 1px solid #e0e0e0;
		position: relative;
		z-index: 999;
	}
	.nav-left{
		display: flex;
		align-items: center;
	}
	.logo {
		width: 30px;
		height: 30px;
	}
	
	.nav-center {
		flex: 1;
		display: flex;
		flex-direction: row;
		justify-content: space-around;
		align-items: center;
		padding: 0 16px;
	}
	
	.nav-item {
		font-size: 14px;
		color: #333333;
		padding: 5px 10px;
	}
	
	.nav-item:first-child {
		color: #007AFF;
		font-weight: bold;
		border-bottom: 2px solid #007AFF;
	}
	
	.nav-right {
		display: flex;
		justify-content: flex-end;
		align-items: center;
		position: relative;
	}
	
	.more-icon {
		font-family: "customicons" !important;
		font-size: 20px;
		color: #333333;
		cursor: pointer;
	}
	
	.popup-menu {
		background-color: #ffffff;
		border-radius: 0 0 5px 5px;
		box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
		width: 120px;
		margin-left: auto;
		margin-top: 44px;
		margin-right: 10px;
	}
	
	.menu-item {
		padding: 15px;
		font-size: 14px;
		color: #333333;
		text-align: center;
		border-bottom: 1px solid #f0f0f0;
	}
	
	.menu-item:last-child {
		border-bottom: none;
	}
	
	.menu-item:active {
		background-color: #f0f0f0;
	}
</style>