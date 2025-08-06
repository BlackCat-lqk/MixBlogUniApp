<template>
  <view>
    <SloganView></SloganView>
    <BannerView></BannerView>
    <HomeData></HomeData>
    <ArticleView></ArticleView>
    <NotesView></NotesView>
    <PhotoView></PhotoView>
  </view>
</template>

<script setup>
import SloganView from "@/pages/home/components/slogan.vue";
import BannerView from "@/pages/home/components/banner.vue";
import HomeData from "@/pages/home/components/homeData.vue";
import ArticleView from "@/pages/home/components/article.vue";
import NotesView from "@/pages/home/components/notes.vue";
import PhotoView from "@/pages/home/components/photo.vue";
</script>

<style lang="scss" scoped></style>
