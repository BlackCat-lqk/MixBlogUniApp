<template>
  <view class="photo-box">
  	<classify-meun :classify="classify" @classifyEmit="handleClassify"></classify-meun>
		<view v-for="(item, idx) in photosData" :key="idx">
			<image-library :photosData="item"></image-library>
		</view>
  	
  	<div class="more-btn" v-if="!isClassify">
  		<button v-if="photosData.length < photosAllData.length" class="more-button" type="primary"
  			@click="moreArticle">
  			加载更多
  		</button>
  		<text v-else class="no-more-textg"> 没有更多了 </text>
  	</div>
  	<div v-else class="more-btn"></div>
  </view>
</template>

<script setup>
	import { ref, reactive, onMounted } from 'vue'
	import ImageLibrary from '@/pages/components/ImageLibrary.vue';
	import { getPhotoLibraryApi } from '@/http/photoLibrary';
	import ClassifyMeun from '@/pages/components/ClassifyMeun.vue';
	import _ from 'lodash'
	
	const photosData = ref([])
	const photosAllData = ref([])
	const isClassify = ref(false)
	const classify = reactive([{
		name: '全部',
		number: 0,
	}, ])
	// 加载更多文章
	const moreArticle = () => {
	  photosData.value = photosAllData.value.slice(0, photosData.value.length + 6)
	}
	// 过滤分类
	const handleClassify = (name) => {
		console.log(name)
		const listData = _.cloneDeep(photosAllData.value)
		console.log(listData)
		const filterData = listData.filter((item) => {
			return item.category === name
		})
		if (name === '全部') {
			isClassify.value = false
			photosData.value = listData.slice(0, 6)
		} else {
			isClassify.value = true
			photosData.value = filterData
		}
	}
	const getPhotoLibrary = async () => {
		const result = await getPhotoLibraryApi({})
		const res = result.data
		if(res.code == 200){
			photosAllData.value = _.cloneDeep(res.data.list)
			photosData.value = res.data.list
			classify[0].number = res.data.pagination.total
			for (const key in res.data.stats.categories) {
				classify.push({
					name: key,
					number: res.data.stats.categories[key],
				})
			}
		}else {
			uni.showToast({
			       title: '网络错误',
			       icon: 'none',
			     });
		}
	}
	
	onMounted(() => {
		getPhotoLibrary()
	})
	
</script>

<style lang="scss" scoped>
	.photo-title {
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
	.no-more-textg {
		text-align: center;
		display: flex;
		justify-content: center;
		padding: 20px 0;
	}
</style>