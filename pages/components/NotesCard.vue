<template>
  <div v-if="hasNote" class="random-notes-right-box">
    <uni-card v-for="(item, idx) in props.notesDetail" :key="idx">
        <div class="random-notes-title">
          <span>{{ item.title }}</span>
          <div class="random-notes-date">
            <p>{{ _formatTime(item.updatedAt).time }}</p>
              <image class="weather-image" :src="weatherIconsURLs[item.weather]" alt="weather" />
          </div>
        </div>
      <!-- <n-divider /> -->
      <div class="random-notes-content">
        <p>
          {{ item.content }}
        </p>
        <image :src="item.cover" loading="lazy" alt="笔记内容图片" />
      </div>
    </uni-card>
  </div>
<!--  <div v-else class="random-notes-right-box no-note">
    <n-empty description="暂无内容">
      <template #extra>
        <n-button size="small"> 去写文章 </n-button>
      </template>
    </n-empty>
  </div> -->
</template>

<script setup>
	import { ref, reactive } from 'vue'
import { _formatTime } from '@/utils/publickFun.js'

const props = defineProps({
  notesDetail: {
    type: Object,
    default: () => ({}),
  },
})
console.log(props.notesDetail)
const weatherIconsURLs = {
  cloudy: '/uploads/weixin/Weather/cloudy.svg',
  overcast: '/uploads/weixin/Weather/overcast.svg',
  pour: '/uploads/weixin/Weather/pour.svg',
  rain: '/uploads/weixin/Weather/rain.svg',
  snow: '/uploads/weixin/Weather/snow.svg',
  sun: '/uploads/weixin/Weather/sun.svg',
  thunderstorm: '/uploads/weixin/Weather/thunderstorm.svg',
  wind: '/uploads/weixin/Weather/wind.svg'
}

const hasNote = ref(true)
</script>

<style scoped lang="scss">
.random-notes-right-box {
  :deep(.uni-card) {
    height: 100%;
    .n-card-header {
      padding-bottom: 0;
    }
    .random-notes-title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      > span {
        font-size: 14px;
        line-height: 34px;
        font-weight: 600;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .random-notes-date {
        display: flex;
				justify-content: center;
				align-items: center;
				.weather-image{
					width: 16px;
					height: 16px;
				}
        p {
          font-size: 12px;
          padding-right: 8px;
        }
      }
    }
    .random-notes-content {
      font-family: serif;
      font-size: 14px;
      line-height: 42px;
      text-align: justify;
      letter-spacing: 1px;
      background-size: 12px 42px;
      text-decoration-line: underline;
      text-decoration-style: dashed;
      text-decoration-color: #ccc;
      text-underline-offset: 10px;
      image {
				width: 96px;
        height: 96px;
        object-fit: cover;
      }
    }
    .n-card__content {
      overflow-y: hidden;
      &:hover {
        overflow-y: auto;
        // @include g.scrollbarCustom;
      }
    }
  }
}
.no-note {
  display: flex;
	justify-content: center;
	align-items: center;
}
</style>
