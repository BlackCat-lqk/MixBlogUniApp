<template>
	<view class="container">
		<view class="register-form">
			<view class="form-title">用户注册</view>
			<view class="input-group">
				<input class="input-item" type="text" placeholder="请输入用户名" v-model="registerForm.username" />
				<input class="input-item" type="email" placeholder="请输入邮箱" v-model="registerForm.email" />
				<input class="input-item" type="password" placeholder="请输入密码" v-model="registerForm.password" />
				<input class="input-item" type="password" placeholder="请确认密码" v-model="registerForm.confirmPassword" />
			</view>
			<button class="register-button" @click="handleRegister">注册</button>
			<view class="form-footer">
				<navigator class="link" url="/pages/login/login">已有账号，立即登录</navigator>
			</view>
		</view>
	</view>
</template>

<script setup>
	import { ref } from 'vue'
	
	const registerForm = ref({
		username: '',
		email: '',
		password: '',
		confirmPassword: ''
	})
	
	const handleRegister = () => {
		// 注册逻辑处理
		console.log('注册信息:', registerForm.value)
		// 这里可以添加实际的注册请求逻辑
		if (registerForm.value.password !== registerForm.value.confirmPassword) {
			console.log('两次输入的密码不一致')
			return
		}
		// 密码一致性检查通过，可以提交注册请求
	}
</script>

<style scoped>
	.container {
		height: 100%;
		background-color: #f4f2ec;
		display: flex;
		flex-direction: column;
		align-items: center;
		padding-top: 80px;
	}
	
	.register-form {
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
	
	.register-button {
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
	
	.register-button:active {
		background-color: #0062cc;
	}
	
	.form-footer {
		display: flex;
		justify-content: center;
		margin-top: 20px;
	}
	
	.link {
		color: #007AFF;
		font-size: 14px;
		text-decoration: none;
	}
</style>