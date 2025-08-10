<template>
	<view class="article-box">
		<classify-meun :classify="classify" @classifyEmit="handleClassify"></classify-meun>
		<article-card :articleData="articleData"></article-card>
		<div class="more-btn" v-if="!isClassify">
			<button v-if="articleData.data.length < articleData.deepData.length" class="more-button" type="primary"
				@click="moreArticle">
				加载更多
			</button>
			<text v-else class="no-more-textg"> 没有更多了 </text>
		</div>
		<div v-else class="more-btn"></div>
	</view>
</template>

<script setup>
	import {
		ref,
		reactive,
		onMounted
	} from 'vue'
	import ArticleCard from '@/pages/components/ArticleCard.vue';
	import ClassifyMeun from '@/pages/components/ClassifyMeun.vue';
	import {
		getAllBlogArticleApi
	} from '@/http/blogArticle';
	import _ from 'lodash'
	const isClassify = ref(false)
	const articleData = reactive({
		data: [],
		columns: 2,
		deepData: [],
	})
	const classify = reactive([{
		name: '全部',
		number: 0,
	}, ])
	// 加载更多文章
	const moreArticle = () => {
	  articleData.data = articleData.deepData.slice(0, articleData.data.length + 6)
	}
	// 过滤分类
	const handleClassify = (name) => {
		const listData = _.cloneDeep(articleData.deepData)
		const filterData = listData.filter((item) => {
			return item.category === name
		})
		if (name === '全部') {
			isClassify.value = false
			articleData.data = listData.slice(0, 6)
		} else {
			isClassify.value = true
			articleData.data = filterData
		}
	}
	// 获取banner数据
	const getArticleData = async () => {
		const response = await getAllBlogArticleApi({})
		const res = response.data
		if (res.code == 200) {
			const listData = res.data.list.filter((item) => item.status === 'published')
			articleData.deepData = _.cloneDeep(listData)
			classify[0].number = res.data.pagination.total
			for (const key in res.data.stats.categories) {
				classify.push({
					name: key,
					number: res.data.stats.categories[key],
				})
			}
			articleData.data = listData.slice(0, 6)
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

		.more-button {
			margin-top: 20px;
			width: 60px;
			height: 34px;
			display: flex;
			align-items: center;
			justify-content: center;
			font-size: 0.8rem;
		}
	}

	.no-more-textg {
		text-align: center;
		display: flex;
		justify-content: center;
		margin-top: 20px;
	}
</style>