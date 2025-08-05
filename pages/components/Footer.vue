<template>
	<view>
		<view class="grid-a-section">
			<uni-section title="技术支持" type="line" padding>
				<swiper class="swiper" :indicator-dots="true">
					<swiper-item>
						<uni-grid :column="3" :highlight="true" @change="change">
							<uni-grid-item v-for="(item, index) in supportData[0, 2]" :index="index" :key="index">
								<view class="grid-item-box">
									<!-- <a :href="item.url" target="_blank">
										<image :src="item.img" class="image" :alt="item.alt" mode="aspectFill" />
									</a> -->
									<!-- <image :src="item.img" class="image" :alt="item.alt" mode="aspectFill" /> -->
									<img :src="item.img" :alt="item.alt" />
								</view>
							</uni-grid-item>
						</uni-grid>
					</swiper-item>
				</swiper>
			</uni-section>
		</view>
		<view>
			<text>Mix Blog 1.1.0 · Made by LQK</text>
			<text>备案/许可证桂ICP备2025066402号</text>
		</view>
	</view>
</template>

<script setup>
	const supportData = [{
			img: '@/static/footer/vue3.svg',
			url: 'https://v3.cn.vuejs.org/',
			alt: 'vue3',
		},
		{
			img: '@/static/footer/typescript.svg',
			url: 'https://www.typescriptlang.org/',
			alt: 'typescript',
		},
		{
			img: '@/static/footer/vite.svg',
			url: 'https://cn.vitejs.dev/',
			alt: 'vitejs',
		},
		{
			img: '@/static/footer/Echarts.svg',
			url: 'https://echarts.apache.org/index.html',
			alt: 'echarts',
		},
		{
			img: '@/static/footer/vant.svg',
			url: 'https://vant-ui.github.io/vant/',
			alt: 'vant',
		},
		{
			img: '@/static/footer/JavaScript.svg',
			url: 'https://www.javascript.com/',
			alt: 'javascript',
		},
		// {
		// 	img: new URL('@/static/footer/Github.svg', import.meta.url).href,
		// 	url: 'https://github.com/',
		// 	alt: 'github',
		// },
		// {
		// 	img: new URL('@/static/footer/naive.svg', import.meta.url).href,
		// 	url: 'https://www.naiveui.com/',
		// 	alt: 'naive ui',
		// },
		// {
		// 	img: new URL('@/static/footer/pinia.svg', import.meta.url).href,
		// 	url: 'https://pinia.vuejs.org/',
		// 	alt: 'pinia',
		// },
		// {
		// 	img: new URL('@/static/footer/Nodejs.svg', import.meta.url).href,
		// 	url: 'https://nodejs.org/',
		// 	alt: 'nodejs',
		// },
		// {
		// 	img: new URL('@/static/footer/express.svg', import.meta.url).href,
		// 	url: 'https://expressjs.com/',
		// 	alt: 'express',
		// },
		// {
		// 	img: new URL('@/static/footer/scss.svg', import.meta.url).href,
		// 	url: 'https://sass-lang.com/',
		// 	alt: 'scss',
		// },
		// {
		// 	img: new URL('@/static/footer/deepseek.svg', import.meta.url).href,
		// 	url: 'https://www.deepseek.com/',
		// 	alt: 'deepseek',
		// },
		// {
		// 	img: new URL('@/static/footer/mongodb.svg', import.meta.url).href,
		// 	url: 'https://www.mongodb.com/',
		// 	alt: 'mongodb',
		// },
		// {
		// 	img: new URL('@/static/footer/esLint.svg', import.meta.url).href,
		// 	url: 'https://eslint.org/',
		// 	alt: 'eslint',
		// },
		// {
		// 	img: new URL('@/static/footer/unocss.svg', import.meta.url).href,
		// 	url: 'https://unocss.dev/',
		// 	alt: 'unocss',
		// },
		// {
		// 	img: new URL('@/static/footer/vuebits.svg', import.meta.url).href,
		// 	url: 'https://vue-bits.dev/',
		// 	alt: 'vuebits',
		// },
		// {
		// 	img: new URL('@/static/footer/quill.svg', import.meta.url).href,
		// 	url: 'https://quilljs.com/',
		// 	alt: 'quill',
		// },
		// {
		// 	img: new URL('@/static/footer/oxlint.svg', import.meta.url).href,
		// 	url: 'https://oxc.rs/docs/guide/usage/linter/config.html',
		// 	alt: 'oxlint',
		// },
		// {
		// 	img: new URL('@/static/footer/bt.svg', import.meta.url).href,
		// 	url: 'https://www.bt.cn/new/index.html',
		// 	alt: 'BT.CN',
		// },
	]
</script>

<style lang="scss" scoped>
</style>