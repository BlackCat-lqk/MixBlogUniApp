<template>
	<view class="footer-box">
		<view class="grid-a-section">
			<uni-section title="技术支持" type="line" padding>
				<swiper class="swiper" :indicator-dots="true">
					<swiper-item>
						<uni-grid :column="4" :highlight="true">
							<uni-grid-item v-for="(item, index) in supportData.slice(0, 4)" :index="index" :key="index">
								<view class="grid-item-box">
									<!-- <uni-link :href="item.url" target="_blank"> -->
										<image :src="item.img" class="footer-image" :alt="item.alt" />
									<!-- </uni-link> -->
								</view>
							</uni-grid-item>
						</uni-grid>
					</swiper-item>
					<swiper-item>
						<uni-grid :column="4" :highlight="true">
							<uni-grid-item v-for="(item, index) in supportData.slice(4, 8)" :index="index" :key="index">
								<view class="grid-item-box">
									<!-- <uni-link :href="item.url" target="_blank"> -->
										<image :src="item.img" class="footer-image" :alt="item.alt" />
									<!-- </uni-link> -->
								</view>
							</uni-grid-item>
						</uni-grid>
					</swiper-item>
					<swiper-item>
						<uni-grid :column="4" :highlight="true">
							<uni-grid-item v-for="(item, index) in supportData.slice(8, 12)" :index="index" :key="index">
								<view class="grid-item-box">
									<!-- <uni-link :href="item.url" target="_blank"> -->
										<image :src="item.img" class="footer-image" :alt="item.alt" />
									<!-- </uni-link> -->
								</view>
							</uni-grid-item>
						</uni-grid>
					</swiper-item>
					<swiper-item>
						<uni-grid :column="4" :highlight="true">
							<uni-grid-item v-for="(item, index) in supportData.slice(12, 16)" :index="index" :key="index">
								<view class="grid-item-box">
									<!-- <uni-link :href="item.url" target="_blank"> -->
										<image :src="item.img" class="footer-image" :alt="item.alt" />
									<!-- </uni-link> -->
								</view>
							</uni-grid-item>
						</uni-grid>
					</swiper-item>
					<swiper-item>
						<uni-grid :column="4" :highlight="true">
							<uni-grid-item v-for="(item, index) in supportData.slice(16, 20)" :index="index" :key="index">
								<view class="grid-item-box">
									<!-- <uni-link :href="item.url" target="_blank"> -->
										<image :src="item.img" class="footer-image" :alt="item.alt" />
									<!-- </uni-link> -->
								</view>
							</uni-grid-item>
						</uni-grid>
					</swiper-item>
				</swiper>
			</uni-section>
		</view>
		<view class="footer-info">
			<text class="text-p1">Mix Blog 1.1.0 · Made by LQK</text>
			<text class="text-p2">备案/许可证 &nbsp;<uni-link href="https://beian.miit.gov.cn/#/Integrated/index">桂ICP备2025066402号</uni-link></text>
		</view>
	</view>
</template>

<script setup>
	const supportData = [{
			img: 'https://m.mixblog.cn/uploads/weixin/footer/vue3.svg',
			url: 'https://v3.cn.vuejs.org/',
			alt: 'vue3',
		},
		{
			img: 'https://m.mixblog.cn/uploads/weixin/footer/typescript.svg',
			url: 'https://www.typescriptlang.org/',
			alt: 'typescript',
		},
		{
			img: 'https://m.mixblog.cn/uploads/weixin/footer/vite.svg',
			url: 'https://cn.vitejs.dev/',
			alt: 'vitejs',
		},	
		{
			img: 'https://m.mixblog.cn/uploads/weixin/footer/Echarts.svg',
			url: 'https://echarts.apache.org/index.html',
			alt: 'echarts',
		},
		{
			img: 'https://m.mixblog.cn/uploads/weixin/footer/vant.svg',
			url: 'https://vant-ui.github.io/vant/',
			alt: 'vant',
		},
		{
			img: 'https://m.mixblog.cn/uploads/weixin/footer/JavaScript.svg',
			url: 'https://www.javascript.com/',
			alt: 'javascript',
		},
		{
			img: 'https://m.mixblog.cn/uploads/weixin/footer/Github.svg',
			url: 'https://github.com/',
			alt: 'github',
		},
		{
			img: 'https://m.mixblog.cn/uploads/weixin/footer/naive.svg',
			url: 'https://www.naiveui.com/',
			alt: 'naive ui',
		},
		{
			img: 'https://m.mixblog.cn/uploads/weixin/footer/pinia.svg',
			url: 'https://pinia.vuejs.org/',
			alt: 'pinia',
		},
		{
			img: 'https://m.mixblog.cn/uploads/weixin/footer/Nodejs.svg',
			url: 'https://nodejs.org/',
			alt: 'nodejs',
		},
		{
			img: 'https://m.mixblog.cn/uploads/weixin/footer/express.svg',
			url: 'https://expressjs.com/',
			alt: 'express',
		},
		{
			img: 'https://m.mixblog.cn/uploads/weixin/footer/scss.svg',
			url: 'https://sass-lang.com/',
			alt: 'scss',
		},
		{
			img: 'https://m.mixblog.cn/uploads/weixin/footer/deepseek.svg',
			url: 'https://www.deepseek.com/',
			alt: 'deepseek',
		},
		{
			img: 'https://m.mixblog.cn/uploads/weixin/footer/mongodb.svg',
			url: 'https://www.mongodb.com/',
			alt: 'mongodb',
		},
		{
			img: 'https://m.mixblog.cn/uploads/weixin/footer/esLint.svg',
			url: 'https://eslint.org/',
			alt: 'eslint',
		},
		{
			img: 'https://m.mixblog.cn/uploads/weixin/footer/unocss.svg',
			url: 'https://unocss.dev/',
			alt: 'unocss',
		},
		{
			img: 'https://m.mixblog.cn/uploads/weixin/footer/vuebits.svg',
			url: 'https://vue-bits.dev/',
			alt: 'vuebits',
		},
		{
			img: 'https://m.mixblog.cn/uploads/weixin/footer/quill.svg',
			url: 'https://quilljs.com/',
			alt: 'quill',
		},
		{
			img: 'https://m.mixblog.cn/uploads/weixin/footer/oxlint.svg',
			url: 'https://oxc.rs/docs/guide/usage/linter/config.html',
			alt: 'oxlint',
		},
		{
			img: 'https://m.mixblog.cn/uploads/weixin/footer/bt.svg',
			url: 'https://www.bt.cn/new/index.html',
			alt: 'BT.CN',
		},
	]
</script>

<style lang="scss" scoped>
	.footer-box{
		margin-top: 40px;
		border-radius: 4px;
		background-color: #fff;
	}
	:deep(.uni-grid){
		display: flex;
		justify-content: center;
		border: none;
		gap: 10px;
	}
:deep(uni-swiper) {
	height: 110px !important;
}
:deep(.uni-grid-item) {
	width: 80px !important;
	height: 80px !important;
	.uni-grid-item--border {
		box-shadow: rgba(0, 0, 0, 0.08) 0px 0px 3px 5px;
		padding: 6px;
	}
}
.grid-item-box {
	width: 100%;
	height: 100%;
}
.footer-image {
	width: 100%;
	height: 100%;
	object-fit: contain;
}
.footer-info {
	text-align: center;
	padding: 10px 0;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	gap: 5px;
	.text-p1 {
		font-size: 14px;
	}
	.text-p2 {
		font-size: 14px;
		color: rgba(11, 25, 38, .72);
	}
}
</style>