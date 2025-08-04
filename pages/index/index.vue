<template>
	<view class="container">
		<view class="navbar">
			<view class="nav-left">
				<image class="logo" src="/static/logo.png" mode="aspectFit"></image>
			</view>
			<view class="nav-center">
				<text class="nav-item">首页</text>
				<text class="nav-item">文章</text>
				<text class="nav-item">图库</text>
				<text class="nav-item">随记</text>
				<text class="nav-item">关于</text>
			</view>
			<view class="nav-right">
				<text class="customicons more-icon" @click="openMenu">&#xe610;</text>
			</view>
		</view>
		
		<uni-popup ref="popup" type="top" :mask-click="true">
			<view class="popup-menu">
				<view class="menu-item" @click="goToLogin">去登录</view>
			</view>
		</uni-popup>
		
		<view class="content">
			hello
		</view>
	</view>
</template>

<script setup>
	import { ref } from 'vue'
	
	const popup = ref(null)
	
	const openMenu = () => {
		popup.value.open()
	}
	
	const goToLogin = () => {
		popup.value.close()
		uni.navigateTo({
			url: '/pages/login/login'
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
	
	.nav-left {
		flex: 1;
	}
	
	.logo {
		width: 30px;
		height: 30px;
	}
	
	.nav-center {
		flex: 2;
		display: flex;
		flex-direction: row;
		justify-content: space-around;
		align-items: center;
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
		flex: 1;
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
	
	.content {
		flex: 1;
		padding: 10px;
	}
</style>