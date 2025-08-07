<template>
	<view class="article-box">
		<view class="article-title">博客文章</view>
		<article-card :articleData="articleData"></article-card>
		<button class="more-button" type="primary">更多</button>
	</view>
</template>

<script setup>
	import {
		ref, reactive
	} from 'vue'
	import ArticleCard from '@/pages/components/ArticleCard.vue';

	const articleData = reactive({
		data: [{
			"_id": "6892b33a8d58a9fd93719cf8",
			"uid": "686118610718bf114ed94ef8",
			"email": "1501036045@qq.com",
			"category": "前端",
			"tags": [
				"前端",
				"插件",
				"开发库"
			],
			"originalCover": "/uploads/blogArticle/articleImages-1754444602503-72150729.png",
			"cover": "/uploads/blogArticle/compressed/articleImages-1754444602503-72150729.webp",
			"title": "\"Lodash\" 的终极版！Vue、React 通杀！",
			"intro": "还记得第一次用 Lodash 的惊艳吗？一行 _.debounce 搞定疯狂触发的搜索框，一个 _.cloneDeep 拯救被引用折磨的 Vuex 状态。",
			"content": "",
			"status": "published",
			"views": [{
				"ip": "219.159.153.70",
				"userId": "686118610718bf114ed94ef8",
				"viewedAt": "2025-08-06T13:32:18.100Z",
				"_id": "6892b34f8d58a9fd93719d19"
			}],
			"likes": [{
				"userId": "686118610718bf114ed94ef8",
				"userName": "ikun",
				"email": "1501036045@qq.com",
				"likedAt": "2025-08-06T01:45:16.812Z",
				"_id": "6892b3ac8d58a9fd93719d23"
			}],
			"comments": [],
			"createdAt": "2025-08-06T01:43:22.366Z",
			"updatedAt": "2025-08-06T13:32:18.101Z",
			"__v": 2
		},{
			"_id": "6892b33a8d58a9fd93719cf8",
			"uid": "686118610718bf114ed94ef8",
			"email": "1501036045@qq.com",
			"category": "前端",
			"tags": [
				"前端",
				"插件",
				"开发库"
			],
			"originalCover": "/uploads/blogArticle/articleImages-1754444602503-72150729.png",
			"cover": "/uploads/blogArticle/compressed/articleImages-1754444602503-72150729.webp",
			"title": "\"Lodash\" 的终极版！Vue、React 通杀！",
			"intro": "还记得第一次用 Lodash 的惊艳吗？一行 _.debounce 搞定疯狂触发的搜索框，一个 _.cloneDeep 拯救被引用折磨的 Vuex 状态。",
			"content": "",
			"status": "published",
			"views": [{
				"ip": "219.159.153.70",
				"userId": "686118610718bf114ed94ef8",
				"viewedAt": "2025-08-06T13:32:18.100Z",
				"_id": "6892b34f8d58a9fd93719d19"
			}],
			"likes": [{
				"userId": "686118610718bf114ed94ef8",
				"userName": "ikun",
				"email": "1501036045@qq.com",
				"likedAt": "2025-08-06T01:45:16.812Z",
				"_id": "6892b3ac8d58a9fd93719d23"
			}],
			"comments": [],
			"createdAt": "2025-08-06T01:43:22.366Z",
			"updatedAt": "2025-08-06T13:32:18.101Z",
			"__v": 2
		}],
		columns: 2,
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