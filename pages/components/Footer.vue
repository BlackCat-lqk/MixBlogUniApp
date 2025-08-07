<template>
	<view class="footer-box">
		<view class="grid-a-section">
			<uni-section title="技术支持" type="line" padding>
				<swiper class="swiper" :indicator-dots="true">
					<swiper-item>
						<uni-grid :column="4" :highlight="true">
							<uni-grid-item v-for="(item, index) in supportData.slice(0, 4)" :index="index" :key="index">
								<view class="grid-item-box">
									<a :href="item.url" target="_blank">
										<image :src="item.img" class="footer-image" :alt="item.alt" />
									</a>
								</view>
							</uni-grid-item>
						</uni-grid>
					</swiper-item>
					<swiper-item>
						<uni-grid :column="4" :highlight="true">
							<uni-grid-item v-for="(item, index) in supportData.slice(4, 8)" :index="index" :key="index">
								<view class="grid-item-box">
									<a :href="item.url" target="_blank">
										<image :src="item.img" class="footer-image" :alt="item.alt" />
									</a>
								</view>
							</uni-grid-item>
						</uni-grid>
					</swiper-item>
					<swiper-item>
						<uni-grid :column="4" :highlight="true">
							<uni-grid-item v-for="(item, index) in supportData.slice(8, 12)" :index="index" :key="index">
								<view class="grid-item-box">
									<a :href="item.url" target="_blank">
										<image :src="item.img" class="footer-image" :alt="item.alt" />
									</a>
								</view>
							</uni-grid-item>
						</uni-grid>
					</swiper-item>
					<swiper-item>
						<uni-grid :column="4" :highlight="true">
							<uni-grid-item v-for="(item, index) in supportData.slice(12, 16)" :index="index" :key="index">
								<view class="grid-item-box">
									<a :href="item.url" target="_blank">
										<image :src="item.img" class="footer-image" :alt="item.alt" />
									</a>
								</view>
							</uni-grid-item>
						</uni-grid>
					</swiper-item>
					<swiper-item>
						<uni-grid :column="4" :highlight="true">
							<uni-grid-item v-for="(item, index) in supportData.slice(16, 20)" :index="index" :key="index">
								<view class="grid-item-box">
									<a :href="item.url" target="_blank">
										<image :src="item.img" class="footer-image" :alt="item.alt" />
									</a>
								</view>
							</uni-grid-item>
						</uni-grid>
					</swiper-item>
				</swiper>
			</uni-section>
		</view>
		<view class="footer-info">
			<text class="text-p1">Mix Blog 1.1.0 · Made by LQK</text>
			<view></view>
			<text class="text-p2">备案/许可证 &nbsp;<a href="https://beian.miit.gov.cn/#/Integrated/index">桂ICP备2025066402号</a></text>
		</view>
	</view>
</template>

<script setup>
	import vue3Image from '@/static/footer/vue3.svg'
	import typescriptImage from '@/static/footer/typescript.svg'
	import viteImage from '@/static/footer/vite.svg'
	import EchartsImage from '@/static/footer/Echarts.svg'
	import vantImage from '@/static/footer/vant.svg'
	import JavaScriptImage from '@/static/footer/JavaScript.svg'
	import GithubImage from '@/static/footer/Github.svg'
	import naiveImage from '@/static/footer/naive.svg'
	import piniaImage from '@/static/footer/pinia.svg'
	import NodejsImage from '@/static/footer/Nodejs.svg'
	import expressImage from '@/static/footer/express.svg'
	import scssImage from '@/static/footer/scss.svg'
	import deepseekImage from '@/static/footer/deepseek.svg'
	import mongodbImage from '@/static/footer/mongodb.svg'
	import esLintImage from '@/static/footer/esLint.svg'
	import unocssImage from '@/static/footer/unocss.svg'
	import vuebitsImage from '@/static/footer/vuebits.svg'
	import quillImage from '@/static/footer/quill.svg'
	import oxlintImage from '@/static/footer/oxlint.svg'
	import btImage from '@/static/footer/bt.svg'
	const supportData = [{
			img: vue3Image,
			url: 'https://v3.cn.vuejs.org/',
			alt: 'vue3',
		},
		{
			img: typescriptImage,
			url: 'https://www.typescriptlang.org/',
			alt: 'typescript',
		},
		{
			img: viteImage,
			url: 'https://cn.vitejs.dev/',
			alt: 'vitejs',
		},	
		{
			img: EchartsImage,
			url: 'https://echarts.apache.org/index.html',
			alt: 'echarts',
		},
		{
			img: vantImage,
			url: 'https://vant-ui.github.io/vant/',
			alt: 'vant',
		},
		{
			img: JavaScriptImage,
			url: 'https://www.javascript.com/',
			alt: 'javascript',
		},
		{
			img: GithubImage,
			url: 'https://github.com/',
			alt: 'github',
		},
		{
			img: naiveImage,
			url: 'https://www.naiveui.com/',
			alt: 'naive ui',
		},
		{
			img: piniaImage,
			url: 'https://pinia.vuejs.org/',
			alt: 'pinia',
		},
		{
			img: NodejsImage,
			url: 'https://nodejs.org/',
			alt: 'nodejs',
		},
		{
			img: expressImage,
			url: 'https://expressjs.com/',
			alt: 'express',
		},
		{
			img: scssImage,
			url: 'https://sass-lang.com/',
			alt: 'scss',
		},
		{
			img: deepseekImage,
			url: 'https://www.deepseek.com/',
			alt: 'deepseek',
		},
		{
			img: mongodbImage,
			url: 'https://www.mongodb.com/',
			alt: 'mongodb',
		},
		{
			img: esLintImage,
			url: 'https://eslint.org/',
			alt: 'eslint',
		},
		{
			img: unocssImage,
			url: 'https://unocss.dev/',
			alt: 'unocss',
		},
		{
			img: vuebitsImage,
			url: 'https://vue-bits.dev/',
			alt: 'vuebits',
		},
		{
			img: quillImage,
			url: 'https://quilljs.com/',
			alt: 'quill',
		},
		{
			img: oxlintImage,
			url: 'https://oxc.rs/docs/guide/usage/linter/config.html',
			alt: 'oxlint',
		},
		{
			img: btImage,
			url: 'https://www.bt.cn/new/index.html',
			alt: 'BT.CN',
		},
	]
</script>

<style lang="scss" scoped>
	.footer-box{
		margin-top: 40px;
	}
:deep(uni-swiper) {
	height: 110px !important;
}
:deep(.uni-grid-item) {
	width: 80px !important;
	height: 80px !important;
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
	.text-p1 {
		font-size: 14px;
	}
	.text-p2 {
		font-size: 14px;
		color: rgba(11, 25, 38, .72);
	}
}
</style>