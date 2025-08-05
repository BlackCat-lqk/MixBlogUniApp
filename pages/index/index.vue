<template>
	<header-nav></header-nav>
	<view class="content">
		<home-index></home-index>
	</view>
	<view class="footer">
		<footer-view></footer-view>
	</view>
</template>

<script setup>
import HeaderNav from '@/pages/components/HeaderNav.vue'
import HomeIndex from '@/pages/home/index.vue'
import FooterView from '@/pages/components/Footer.vue'
</script>

<style lang="scss" scoped>

</style>