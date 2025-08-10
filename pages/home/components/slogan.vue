<template>
	<view class="slogan-main-box">
		<image class="slogan-logo" :src="'https://m.mixblog.cn' + formValue.cover" alt="slogan Logo">
		</image>
		<view class="slogan-text-box">
			<text style="font-size: 24px;">{{ formValue.sloganTitle }}</text>
			<text>{{ formValue.sloganSub1 }}</text>
			<text>{{ formValue.sloganSub2 }}</text>
		</view>
		<view class="slogan-container">
			<!-- <uni-link href="https://github.com/BlackCat-lqk/MixBlog"> -->
				<image :src="img1" class="slogan-image" alt="slogan Logo"></image>
			<!-- </uni-link> -->
			<!-- <uni-link href="https://space.bilibili.com/154164424?spm_id_from=333.1007.0.0"> -->
				<image :src="img2" class="slogan-image" alt="slogan Logo"></image>
			<!-- </uni-link> -->

			<button class="button" type="primary" @click="isNoDev">MIX AI</button>
		</view>
	</view>
</template>

<script setup>
	import {
		onMounted,
		ref,
		reactive
	} from 'vue';
	import {
		getSloganApi
	} from '@/http/slogan';
	import {
		useSloganInfoStore
	} from '@/stores/slogan'
	const baseURL = 'https://m.mixblog.cn'
	const img1 = 'https://m.mixblog.cn/uploads/weixin/Github.svg'
	const img2 = 'https://m.mixblog.cn/uploads/weixin/Blibli.svg'
	const sloganStore = useSloganInfoStore()
	const formValue = reactive({
		logoPicture: '',
		logoName: '',
		sloganTitle: '',
		sloganSub1: '',
		sloganSub2: '',
		cover: '',
	})
	const isNoDev = () => {
		uni.showToast({
			title: '该功能移动端暂未上线，请使用客户端打开！',
			icon: 'none',
		});
	}
	// 获取slogan数据
	const getSloganConfig = async () => {
		const response = await getSloganApi({})
		const res = response.data
		if (res.code == 200) {
			formValue.logoPicture = res.data.logoPicture
			formValue.logoName = res.data.logoName
			formValue.sloganTitle = res.data.sloganTitle
			formValue.sloganSub1 = res.data.sloganSub1
			formValue.sloganSub2 = res.data.sloganSub2
			formValue.cover = res.data.cover
			sloganStore.setSloganConfig(formValue)
		} else {
			uni.showToast({
				title: '网络错误',
				icon: 'none',
			});
		}
	}

	onMounted(() => {
		getSloganConfig()
	})
</script>

<style scoped lang="scss">
	.slogan-main-box {
		position: relative;
		background: linear-gradient(to right, #7f7fd5, #86a8e7, #91eae4);
		backdrop-filter: blur(30px);
		height: 200px;
		margin: 10px 10px 0 10px;
		border-radius: 4px;
		box-shadow: rgba(0, 0, 0, 0.08) 0px 0px 3px 1px;

		.slogan-logo {
			width: 70%;
			height: 100%;

			img {
				width: 100%;
				height: 100%;
				object-fit: contain;
			}
		}

		.slogan-text-box {
			position: absolute;
			left: 70%;
			top: 45%;
			transform: translate(-50%, -50%);
			display: flex;
			flex-direction: column;
			line-height: 1.54;
			font-size: 24px;
			font-weight: 600;
			color: #003b59;
			/* 后备颜色 */
			background: linear-gradient(to right, #003b59, #3e005d);
			-webkit-background-clip: text;
			background-clip: text;
			-webkit-text-fill-color: transparent;
			text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
		}

		.slogan-container {
			position: absolute;
			bottom: 0;
			left: 50%;
			transform: translate(-50%, -50%);
			display: flex;
			align-items: center;
			justify-content: center;
			gap: 12px;
			height: 32px;

			.slogan-image {
				width: 32px;
				height: 32px;
			}

			.button {
				margin: 0;
				height: 32px;
				display: flex;
				align-items: center;
			}
		}
	}
</style>