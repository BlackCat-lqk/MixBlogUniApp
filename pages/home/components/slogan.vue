<template>
	<view class="slogan-main-box">
		<image class="slogan-logo" :src="formValue.cover" alt="slogan Logo">
		</image>
		<view class="slogan-text-box">
			<text style="font-size: 24px;">{{ formValue.sloganTitle }}</text>
			<text>{{ formValue.sloganSub1 }}</text>
			<text>{{ formValue.sloganSub2 }}</text>
		</view>
		<view class="slogan-container">
			<image @click="openExternal('https://github.com/BlackCat-lqk/MixBlog')" src="@/static/Github.svg"
				class="slogan-image" alt="slogan Logo"></image>
			<image @click="openExternal('https://space.bilibili.com/154164424?spm_id_from=333.1007.0.0')"
				src="@/static/Blibli.svg" class="slogan-image" alt="slogan Logo"></image>
			<button class="button" type="primary">MIX AI</button>
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
	import { useSloganInfoStore } from '@/stores/slogan'

const sloganStore = useSloganInfoStore()
	const openExternal = (val) => {
		window.location.href = val;
	}
	const formValue = reactive({
		logoPicture: '',
		logoName: '',
		sloganTitle: '',
		sloganSub1: '',
		sloganSub2: '',
		cover: '',
	})
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
			top: 50%;
			transform: translate(-50%, -50%);
			display: flex;
			flex-direction: column;
			line-height: 1.54;
			font-size: 24px;
			font-weight: 600;
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

			.slogan-image {
				width: 24px;
				height: 24px;
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