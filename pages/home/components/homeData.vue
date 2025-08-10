<template>
    <view class="home-data-container">
        <view class="total-count">
            <span>{{ dataList.totalCount }}</span>
            <text>总访问</text>
        </view>
        <view class="today-count">
            <span>{{ dataList.todayCount }}</span>
            <text>今日访问</text>
        </view>
    </view>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { getVisitStatsApi } from '@/http/visit';

const dataList = ref([])
const getVisitStats = async () => {
	const result = await getVisitStatsApi({})
	const res = result.data
	if(res.code == 200){
		dataList.value = res.data
	}else {
		uni.showToast({
		       title: '网络错误',
		       icon: 'none',
		     });
	}
}

onMounted(() => {
	getVisitStats()
})
</script>

<style scoped lang="scss">
.home-data-container {
    margin-top: 20px;
    display: flex;
    gap: 18px;
    justify-content: center;
    margin: 20px 10px;
    .total-count, .today-count {
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        background: linear-gradient(121deg, rgba(186, 255, 16, .1) 0%, rgba(255, 37, 243, .09) 100%);
        padding: 10px;
        border-radius: 4px;
				box-shadow: rgba(0, 0, 0, 0.08) 0px 0px 3px 1px;
        span{
            display: block;
            font-size: 2rem;
        }
    }
}
</style>