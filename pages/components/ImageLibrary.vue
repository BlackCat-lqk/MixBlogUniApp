<template>
  <div class="photo-gallery-box" @click="photoClick">
    <div
      class="photo-gallery-centent"
			:style="{ backgroundImage: 'url(' + props.photosData.photos[0] + ')' }"
    >
      <div class="photo-gallery-bg">{{ props.photosData.photos.length }}</div>
      <div class="photo-gallery-desc">
        <div class="photo-gallery-title">
          <p class="p-h1">{{ props.photosData.title }}</p>
          <div class="photo-gallery-title-data">
            <p>{{ _formatTime(props.photosData.updatedAt).date }}</p>
            <div class="views-comment-icon">
              <span>
                <image :src="likes" alt="likes" />
                {{ props.photosData.likes.length }}
              </span>
              <span>
                <image :src="views" alt="views" />
                {{ props.photosData.views.length }}
              </span>
              <span>
                <image :src="comments" alt="comment" />
                {{ props.photosData.comments.length }}
              </span>
            </div>
          </div>
        </div>
        <div class="photo-gallery-desc-p">
          <p>{{ props.photosData.content }}</p>
        </div>
      </div>
    </div>
		<PopupContent ref="popup" :popupData="photoDetail" :count="countPopup">
		</PopupContent>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { _formatTime } from '@/utils/publickFun';
import PopupContent from '@/pages/components/PopupPhoto.vue'
const likes = '/uploads/weixin/likes.svg'
	const views = '/uploads/weixin/views.svg'
	const comments = '/uploads/weixin/comment.svg'
const props = defineProps({
	photosData: {
    type: Object,
    default: () => {},
  },
})
	let photoDetail = reactive([])
const popup = ref(null)
	
	const countPopup = ref(0)
	const photoClick = () => {
		photoDetail = props.photosData
		countPopup.value++
		popup.value.open()
	}
</script>

<style scoped lang="scss">
.photo-gallery-box {
  display: flex;
  flex-direction: column;
  margin: 15px 15px 0 15px;
  .photo-gallery-centent {
    height: 496px;
    width: 100%;
    overflow: hidden;
    border-radius: 8px;
    position: relative;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    position: relative;
		border: 1px solid #ccc;
    .photo-gallery-bg {
      position: absolute;
      cursor: pointer;
			top: 10px;
      right: 10px;
      height: 32px;
      width: 32px;
			border-radius: 5px;
      backdrop-filter: blur(1px);
			background-color: #f3f3f33d;
			display: flex;
			justify-content: center;
			align-items: center;
			color: #fff;
    }
    .photo-gallery-desc {
      position: absolute;
      width: calc(100% - 20px);
      left: 0;
			bottom: 0;
			padding: 5px 10px;
			background-image: linear-gradient(180deg, #0000, #0000008f);
      .photo-gallery-title {
        display: flex;
        justify-content: space-between;
        flex-direction: column;
        .p-h1 {
          color: #fff;
          font-size: 16px;
          font-weight: 600;
          margin: 4px 0px;
        }
        .photo-gallery-title-data {
          display: flex;
          align-items: center;
          justify-content: space-between;
          .views-comment-icon {
            display: flex;
            align-items: center;
            span {
              display: flex;
              align-items: center;
              gap: 2px;
            }
						image {
							width: 14px;
							height: 14px;
						}
          }
          p {
            font-size: 12px;
            color: #e5e5e5;
          }
          span {
            font-size: 12px;
            color: #fff;
            margin-left: 8px;
          }
        }
      }
      .photo-gallery-desc-p {
        color: #fff;
        padding-top: 10px;
        font-size: 14px;
				line-height: 1.54;
        text-align: justify;
				overflow: hidden;
				display: -webkit-box;
				-webkit-box-orient: vertical;
				-webkit-line-clamp: 4;
				overflow: hidden;
				text-overflow: ellipsis;
				/* 小程序可能需要 */
				word-wrap: break-word;
				word-break: break-all;
      }
    }
	}
}
</style>
