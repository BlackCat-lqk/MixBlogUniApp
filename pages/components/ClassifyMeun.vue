<template>
  <div class="classify-box">
    <div class="classify-item-box">
      <div class="classify-item-box-bg">
        <div
          :class="isSelected == item.name ? 'active-classify-item' : 'classify-item'"
          v-for="(item, idx) in props.classify"
          :key="idx"
          @click="classifyClick(item.name)"
        >
          <span>{{ item.name }}{{ item.number }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const isSelected = ref('全部')
const emit = defineEmits(['classifyEmit'])

// 过滤分类
const classifyClick = (name) => {
  emit('classifyEmit', name)
  isSelected.value = name
}
const props = defineProps<{
  classify: []
}>()
</script>

<style scoped lang="scss">
.classify-box {
  width: 100%;
  display: flex;
  flex-direction: column;
	margin-top: 20px;
  .classify-item-box {
    display: flex;
		justify-content: center;
		align-items: center;
    flex: 1;
    .classify-item-box-bg {
      background-color: #fff;
      display: flex;
      justify-content: center;
      align-items: center;
			border-radius: 4px;
    }
  }
  .classify-item {
    width: 77px;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 50px;
    margin: 5px 10px;
    background-color: #fff;
    border-radius: 4px;
    span {
      color: #000;
    }
  }
  .active-classify-item {
    width: 77px;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 50px;
    margin: 5px 10px;
    background-color: #dfdfdf;
    border-radius: 4px;
    cursor: pointer;
  }
}
</style>
