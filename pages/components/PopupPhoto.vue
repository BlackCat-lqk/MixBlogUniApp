<template>
	<view>
		<uni-popup ref="popup" type="bottom" :mask-click="true" @maskClick="close">
			<view class="popup-content">
				<view class="popup-header">
					<text class="title">{{ props.popupData.title }}</text>
					<uni-icons type="close" size="24" color="#999" @click="close"></uni-icons>
				</view>
				<scroll-view scroll-y class="popup-body">
					<view class="header-date-icon">
						<text class="title-date">{{ _formatTime(props.popupData.updatedAt).date }}</text>
						<div class="views-comment-icon">
							<span>
								<image :src="likes" alt="点赞" />
								{{ props.popupData.likes.length }}
							</span>
							<span>
								<image :src="views" alt="浏览" />
								{{ props.popupData.views.length }}
							</span>
							<span>
								<image :src="comments" alt="评论" />
								{{ props.popupData.comments.length }}
							</span>
						</div>
					</view>
					<div class="intro">
						{{ props.popupData.content }}
					</div>
					<view class="image-content">
						<img v-for="(item, idx) in props.popupData.photos" :key="idx" :src="item"></img>
					</view>
					
				</scroll-view>
			</view>
		</uni-popup>
	</view>
</template>

<script setup>
	import {
		ref,
		watch,
		reactive
	} from 'vue'
	import {
		_formatTime
	} from '@/utils/publickFun.js';
const likes = '/uploads/weixin/likes.svg'
	const views = '/uploads/weixin/views.svg'
	const comments = '/uploads/weixin/comment.svg'
	const emit = defineEmits(['update:showModel'])
	// 获取popup实例
	const popup = ref(null)
	// 打开弹出层
	const open = () => {
		popup.value.open()
	}

	// 关闭弹出层
	const close = () => {
		emit('update:showModel', false)
		popup.value.close()
	}
	// 暴露方法，供父组件调用
	defineExpose({
		open,
		close
	})
	// 定义props
	const props = defineProps({
		popupData: Object,
		showModel: Boolean,
		count: Number,
	})
</script>

<style scoped>
	.popup-content {
		background-color: #fff;
		border-radius: 16rpx 16rpx 0 0;
		padding-bottom: env(safe-area-inset-bottom);
	}

	.popup-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 24rpx 32rpx;
		border-bottom: 1rpx solid #f5f5f5;
	}

	.title {
		font-size: 32rpx;
		font-weight: bold;
		color: #333;
	}

	.title-date {
		font-size: 14px;
	}

	.popup-body {
		max-height: 60vh;
		padding: 24rpx 32rpx;
		width: auto;
	}
	.intro {
		background-color: #f5f5f5;
		font-size: 14px;
		margin: 10px;
		border-radius: 4px;
		padding: 0 5px;
	}
	.popup-footer {
		display: flex;
		padding: 20rpx 32rpx;
		border-top: 1rpx solid #f5f5f5;
	}
	.header-date-icon {
		display: flex;
		justify-content: space-between;
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
	.image-content {
		width: 100%;
		height: auto;
		img {
			width: 100%;
			height: 100%;
			object-fit: contain;
			margin: 20px 0;
			border-radius: 8px;
		}
	}

	.footer-btn {
		flex: 1;
		margin: 0 10rpx;
		font-size: 28rpx;
	}

	.footer-btn:first-child {
		margin-left: 0;
	}

	.footer-btn:last-child {
		margin-right: 0;
	}
</style>