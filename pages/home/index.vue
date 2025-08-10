<template>
  <view>
		<uni-notice-bar showIcon showClose single text="PC客户端打开解锁更好的体验和更多的功能"></uni-notice-bar>
    <SloganView></SloganView>
    <BannerView></BannerView>
    <HomeData></HomeData>
    <ArticleView></ArticleView>
    <NotesView></NotesView>
    <PhotoView></PhotoView>
  </view>
</template>

<script setup>
import { onMounted } from 'vue'
import SloganView from "@/pages/home/components/slogan.vue";
import BannerView from "@/pages/home/components/banner.vue";
import HomeData from "@/pages/home/components/homeData.vue";
import ArticleView from "@/pages/home/components/article.vue";
import NotesView from "@/pages/home/components/notes.vue";
import PhotoView from "@/pages/home/components/photo.vue";
import { recordVisitApi, getVisitorIpApi } from '@/http/visit'
import { getDeviceType } from '@/utils/deviceUtils'

// 记录访问统计
const recordVisit = async () => {
	const userAgent = getDeviceType()
  const res = await getVisitorIpApi()
  const params = {
    userAgent,
    ipAddress: res.data.ip,
    ...res.data,
  }
  const response = await recordVisitApi(params)
  const result = response.data
  if (result.code === 200) {
    return
  } else {
    return
  }
}

onMounted(() => {
  recordVisit()
})
</script>

<style lang="scss" scoped></style>
