<template>
  <view class="back-to-top" :class="{ 'show': isVisible }" @click="scrollToTop">
    <slot>
      <view class="default-icon">
        <uni-icons type="arrow-up" size="24" color="#ffffff"></uni-icons>
      </view>
    </slot>
  </view>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

// 控制显示/隐藏的状态
const isVisible = ref(false)

// 滚动监听函数
const handleScroll = () => {
  // 获取滚动位置
  const scrollTop = document.documentElement.scrollTop || document.body.scrollTop || 0
  // 当滚动超过 300px 时显示按钮
  isVisible.value = scrollTop > 300
}

// 回到顶部函数
const scrollToTop = () => {
  // 平滑滚动到顶部
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}

// 组件挂载时添加滚动监听
onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

// 组件卸载时移除滚动监听
onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
.back-to-top {
  position: fixed;
  right: 30rpx;
  bottom: 30rpx;
  width: 80rpx;
  height: 80rpx;
  border-radius: 50%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.3s ease;
  z-index: 999;
}

.back-to-top.show {
  opacity: 1;
  transform: translateY(0);
}

.default-icon {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
}
</style>