<template>
	<view class="container">
		<view class="login-form">
			<view class="form-title">用户登录</view>
			<view class="input-group">
				<input class="input-item" type="text" placeholder="请输入用户名" v-model="loginForm.username" />
				<input class="input-item" type="password" placeholder="请输入密码" v-model="loginForm.password" />
			</view>
			<button class="login-button" @click="handleLogin">登录</button>
			<view class="form-footer">
				<navigator class="link" url="/pages/register/register">立即注册</navigator>
				<text class="link">|</text>
				<navigator class="link" url="">忘记密码</navigator>
			</view>
		</view>
	</view>
</template>

<script setup>
	import { ref } from 'vue'
	
	const loginForm = ref({
		username: '',
		password: ''
	})
	
	const handleLogin = () => {
		// 登录逻辑处理
		console.log('登录信息:', loginForm.value)
		// 这里可以添加实际的登录请求逻辑
	}
</script>

<style scoped>
	.container {
		height: 100%;
		background-color: #f4f2ec;
		display: flex;
		flex-direction: column;
		align-items: center;
		padding-top: 100px;
	}
	
	.login-form {
		width: 90%;
		background-color: #ffffff;
		border-radius: 10px;
		padding: 20px;
		box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
	}
	
	.form-title {
		font-size: 24px;
		font-weight: bold;
		text-align: center;
		margin-bottom: 30px;
		color: #333333;
	}
	
	.input-group {
		margin-bottom: 20px;
	}
	
	.input-item {
		width: 100%;
		height: 45px;
		border: 1px solid #e0e0e0;
		border-radius: 5px;
		padding: 0 15px;
		margin-bottom: 15px;
		font-size: 16px;
		box-sizing: border-box;
	}
	
	.input-item:focus {
		border-color: #007AFF;
		outline: none;
	}
	
	.login-button {
		width: 100%;
		height: 45px;
		background-color: #007AFF;
		color: #ffffff;
		border: none;
		border-radius: 5px;
		font-size: 16px;
		font-weight: bold;
		margin-top: 10px;
	}
	
	.login-button:active {
		background-color: #0062cc;
	}
	
	.form-footer {
		display: flex;
		justify-content: space-between;
		margin-top: 20px;
	}
	
	.link {
		color: #007AFF;
		font-size: 14px;
		text-decoration: none;
	}
</style>