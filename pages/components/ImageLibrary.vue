<template>
  <div class="photo-gallery-box">
    <div
      class="photo-gallery-centent"
    >
      <div class="photo-gallery-bg">8</div>
      <div class="photo-gallery-desc">
        <div class="photo-gallery-title">
          <p class="p-h1">雪</p>
          <div class="photo-gallery-title-data">
            <p>2022-02-05</p>
            <div class="views-comment-icon">
              <span>
                <image src="@/static/likes.svg" alt="likes" />
                {{ photoItem.likes.length }}
              </span>
              <span>
                <image src="@/static/views.svg" alt="views" />
                {{ photoItem.views.length }}
              </span>
              <span>
                <image src="@/static/comment.svg" alt="comment" />
                {{ photoItem.comments.length }}
              </span>
            </div>
          </div>
        </div>
        <div class="photo-gallery-desc-p">
          <p>第一次遇雪</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, reactive } from 'vue'
import { _formatTime } from '@/utils/publickFun'
const showActiveDrawer = ref(false)
const photoItem = ref({
  _id: '',
  title: '',
  photos: [],
  content: '',
  updatedAt: '',
  category: '',
  comments: [],
  likes: [],
  views: [],
})
const state = reactive({
  photoLibrary: [],
  step: 0,
  dataCount: 0,
})
let imagesDetail = reactive({
  _id: '',
  title: '',
  content: '',
  category: '',
  updatedAt: '',
  photos: [],
  comments: [],
  likes: [],
  views: [],
})
// 获取图库信息
const getPhotoLibrary = async () => {
  state.photoLibrary = []
}

onMounted(() => {
  getPhotoLibrary()
})
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
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
    position: relative;
		background-image:url('@/static/logo-transparent.webp');
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
			background-color: #0000003d;
			display: flex;
			justify-content: center;
			align-items: center;
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
          color: #000;
          font-size: 14px;
          font-weight: 600;
          margin: 4px 0px;
        }
        p {
          color: #000;
          font-size: 12px;;
          text-align: justify;
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
            color: #000;
          }
          span {
            font-size: 12px;
            color: #000;
            margin-left: 8px;
          }
        }
      }
      .photo-gallery-desc-p {
        color: #000;
        padding-top: 10px;
        font-size: 14px;
        text-align: justify;
      }
    }
	}
}
</style>
