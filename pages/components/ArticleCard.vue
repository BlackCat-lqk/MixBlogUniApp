<template>
	<div class="article-cards-box" :style="{ gridTemplateColumns: 'repeat(' + props.articleData.columns + ', 1fr)' }">
		<div class="article-card-box" v-for="(item, idx) in props.articleData.data" :key="idx" @click="articleClick(item)">
			<div class="article-card-header">
				<div class="article-card-header-img">
					<image :src="baseURL + item.cover" alt="文章封面" loading="lazy" />
				</div>
				<div class="article-card-header-title">
					<p class="p-h3">{{ item.title }}</p>
					<p>{{ _formatTime(item.updatedAt).date }}</p>
				</div>
			</div>
			<div class="article-card-content">
				<p>
					{{ item.intro }}
				</p>
			</div>
			<div class="article-card-footer">
				<span>
					<uni-tag :text="item.category" type="primary" :circle="true"></uni-tag>
					&nbsp;
					<uni-tag style="margin-right: 5px" v-for="(tag, idx) in item.tags" :key="idx" circle type="primary"
						:text="tag" :circle="true" :inverted="true" size="small">
					</uni-tag>
				</span>
				<div class="views-comment-icon">
					<span>
						<image width="20px" :src="likes" alt="点赞" />
						{{ item.likes.length }}
					</span>
					<span>
						<image width="20px" :src="views" alt="浏览" />
						{{ item.views.length }}
					</span>
					<span>
						<image width="20px" :src="comments" alt="评论" />
						{{ item.comments.length }}
					</span>
				</div>
			</div>
		</div>
		<PopupContent ref="popup" :popupData="articleDetail" :count="countPopup">
		</PopupContent>
	</div>
</template>
<script setup>
	import {
		_formatTime
	} from '@/utils/publickFun.js';
	import {
		ref,
		reactive
	} from 'vue';
	import PopupContent from '@/pages/components/PopupContent.vue'
	const likes = 'https://m.mixblog.cn/uploads/weixin/likes.svg'
	const views = 'https://m.mixblog.cn/uploads/weixin/views.svg'
	const comments = 'https://m.mixblog.cn/uploads/weixin/comment.svg'
	const baseURL = 'https://m.mixblog.cn'
	let articleDetail = reactive({
		_id: '',
		title: '',
		content: '',
		intro: '',
		category: '',
		updatedAt: '',
		tags: [],
		comments: [],
		likes: [],
		views: [],
	})
	const props = defineProps({
		articleData: {
			type: Object,
			default: () => {},
		},
	})
	const popup = ref(null)
	
	const countPopup = ref(0)
	const articleClick = (data) => {
		articleDetail = data
		countPopup.value++
		popup.value.open()
	}
</script>
<style lang="scss" scoped>
	.article-cards-box {
		.article-card-box {
			border-radius: 4px;
			padding: 10px;
			cursor: pointer;
			transition: all 0.2s;
			background-color: #fff;
			box-shadow: rgba(0, 0, 0, 0.08) 0px 0px 3px 1px;
			margin: 50px 10px 0 10px;

			.article-card-header {
				margin-top: -38px;
				display: flex;
				align-items: center;
				gap: 24px;

				.article-card-header-img {
					width: 120px;
					height: 80px;
					border-radius: 5px;
					overflow: hidden;
					box-shadow: rgba(0, 0, 0, 0.08) 0px 0px 3px 1px;
					border: 2px solid #fff;

					image {
						width: 100%;
						height: 100%;
						object-fit: contain;
					}
				}

				.article-card-header-title {
					gap: 12px;
					padding-top: 16px;

					.p-h3 {
						padding-top: 16px;
						font-size: 1rem;
						line-height: 1.4;
						font-weight: 600;
						transition: all 0.2s;
						color: #000;
					}

					p {
						color: #000;
						font-size: 14px;
						line-height: 1.54;
					}
				}
			}

			.article-card-content {
				height: 56px;
				padding: 5px 0;

				p {
					height: 44px;
					overflow: hidden;
					display: -webkit-box;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 2;
					overflow: hidden;
					text-overflow: ellipsis;
					/* 小程序可能需要 */
					word-wrap: break-word;
					word-break: break-all;
					font-size: 14px;
					color: #000;
				}
			}

			.article-card-footer {
				display: flex;
				justify-content: space-between;
				align-items: center;

				span {
					font-size: 12px;
					color: #000;
				}

				.views-comment-icon {
					display: flex;
					align-items: center;
					gap: 4px;

					image {
						width: 20px;
						height: 20px;
					}

					span {
						display: flex;
						align-items: center;
						gap: 2px;
					}
				}
			}

			&:hover {
				.article-card-header-title {
					.p-h3 {
						color: #0aa9db;
					}
				}
			}
		}
	}
</style>