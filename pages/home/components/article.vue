<template>
	<view class="article-box">
		<view class="article-title">博客文章</view>
		<article-card :articleData="articleData"></article-card>
		<button class="more-button" type="primary">更多</button>
	</view>
</template>

<script setup>
	import {
		ref, reactive, onMounted
	} from 'vue'
	import ArticleCard from '@/pages/components/ArticleCard.vue';
	import {
			getAllBlogArticleApi
		} from '@/http/blogArticle';
	const articleData = reactive({
		data: [],
		columns: 2,
	})
	// 获取banner数据
	const getArticleData = async () => {
		const response = await getAllBlogArticleApi({})
		const res = response.data
		if (res.code == 200) {
			if(res.data.list.length <= 3){
				articleData.data = res.data.list
			}else {
				articleData.data = res.data.list.slice(0,3)
			}
		} else {
			uni.showToast({
				title: '网络错误',
				icon: 'none',
			});
		}
	}
	onMounted(() => {
		getArticleData()
	})
</script>

<style scoped lang="scss">
	.article-box {
		.article-title {
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
	}
</style>