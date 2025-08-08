<template>
  <view class="article-box">
  	<view class="article-title">随笔随记</view>
  	<notes-card :notesDetail="notesDetail"></notes-card>
  	<button class="more-button" type="primary">更多</button>
  </view>
</template>

<script setup>
	import { ref, reactive, onMounted } from 'vue'
	import NotesCard from '@/pages/components/NotesCard.vue';
	import { getNotesApi } from '@/http/notes';
	
	const notesDetail = ref({
	  id: '',
	  title: '',
	  content: '',
	  updatedAt: '',
	  weather: '',
	  cover: '',
	})
	
	const getNotesData = async () => {
		const result = await getNotesApi({})
		const res = result.data
		if(res.code == 200){
			notesDetail.value = res.data.list
		}else {
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
	.more-button{
		margin-top: 20px;
		width: 60px;
		height: 34px;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 0.8rem;
	}
</style>