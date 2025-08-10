<template>
	<view class="article-box">
		<uni-calendar class="uni-calendar--hook" :selected="selected" :showMonth="false" @change="change" />
		<notes-card :notesDetail="notesDetail"></notes-card>
		<view v-if="notesDetail.length < 1" style="display: flex;justify-content: center; padding: 20px;">无数据</view>
	</view>
</template>

<script setup>
	import {
		ref,
		reactive,
		onMounted
	} from 'vue'
	import NotesCard from '@/pages/components/NotesCard.vue';
	import {
		getNotesApi
	} from '@/http/notes';
	import { _formatTime } from '@/utils/publickFun';
	import _ from 'lodash'

	const notesDetail = ref({
		id: '',
		title: '',
		content: '',
		updatedAt: '',
		weather: '',
		cover: '',
	})
	
	const notesAllDetail = ref({
		id: '',
		title: '',
		content: '',
		updatedAt: '',
		weather: '',
		cover: '',
	})

	const selected = ref([])
	// 过滤符合的数据
	const change = (e) => {
		const listData = _.cloneDeep(notesAllDetail.value)
		notesDetail.value = listData.filter((item) => {
			return _formatTime(item.updatedAt).date == e.fulldate
		})
	}
	const getNotesData = async () => {
		const result = await getNotesApi({})
		const res = result.data
		if (res.code == 200) {
			notesDetail.value = res.data
			notesAllDetail.value = _.cloneDeep(res.data)
			selected.value = []
			res.data.map((item) => {
				selected.value.push({
					date: _formatTime(item.updatedAt).date,
					info: '日记'
				})
			})
		} else {
			uni.showToast({
				title: '网络错误',
				icon: 'none',
			});
		}
	}

	onMounted(() => {
		getNotesData()
	})
</script>

<style lang="scss" scoped>
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
</style>