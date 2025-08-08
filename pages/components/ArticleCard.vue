<template>
  <div
    class="article-cards-box"
    :style="{ gridTemplateColumns: 'repeat(' + props.articleData.columns + ', 1fr)' }"
  >
    <div
      class="article-card-box"
      v-for="(item, idx) in props.articleData.data"
      :key="idx"
      @click="articleClick(item)"
    >
      <div class="article-card-header">
        <div class="article-card-header-img">
          <image :src="item.cover" alt="文章封面" loading="lazy" />
        </div>
        <div class="article-card-header-title">
          <p class="p-h3">{{ item.title }}</p>
          <p>{{ _formatTime(item.updatedAt).date }}</p>
        </div>
      </div>
      <div class="article-card-content">
        <p>
          {{ item.intro }}
        </p>
      </div>
      <div class="article-card-footer">
        <span>
					<uni-tag :text="item.category" type="primary" :circle="true"></uni-tag>
          &nbsp;
          <uni-tag
            style="margin-right: 5px"
            v-for="(tag, idx) in item.tags"
            :key="idx"
            circle
            type="default"
						:text="tag"
						:circle="true"
          >
          </uni-tag>
        </span>
        <div class="views-comment-icon">
          <span>
            <image width="20px" src="@/static/likes.svg" alt="点赞" />
            {{ item.likes.length }}
          </span>
          <span>
            <image width="20px" src="@/static/views.svg" alt="浏览" />
            {{ item.views.length }}
          </span>
          <span>
            <image width="20px" src="@/static/comment.svg" alt="评论" />
            {{ item.comments.length }}
          </span>
        </div>
      </div>
    </div>
  </div>
  <!-- <ArticleDetail v-model:showModal="showActiveDrawer" :data="articleDetail"></ArticleDetail> -->
</template>
<script setup>
import { _formatTime } from '@/utils/publickFun.js'
import { ref, reactive } from 'vue'
// import ArticleDetail from '@/views/Article/ArticleDetail.vue'
// const showActiveDrawer = ref(false)
let articleDetail = reactive({
  _id: '',
  title: '',
  content: '',
  intro: '',
  category: '',
  updatedAt: '',
  tags: [],
  comments: [],
  likes: [],
  views: [],
})
const props = defineProps({
  articleData: {
    type: Object,
    default: () => {},
  },
})
const articleClick = (data) => {
  articleDetail = data
  // showActiveDrawer.value = true
}
</script>
<style lang="scss" scoped>
.article-cards-box {
  .article-card-box {
    border-radius: 4px;
    padding: 8px;
    cursor: pointer;
    transition: all 0.2s;
    background-color: #fff;
    box-shadow: rgba(0, 0, 0, 0.08) 0px 0px 3px 1px;
		margin: 50px 10px 0 10px;
    .article-card-header {
      margin-top: -38px;
      display: flex;
      align-items: center;
      gap: 24px;
      .article-card-header-img {
        width: 120px;
        height: 80px;
        border-radius: 5px;
        overflow: hidden;
        image {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }
      }
      .article-card-header-title {
        gap: 14px;
        padding-top: 16px;
        .p-h3 {
          padding-top: 16px;
          font-size: 1rem;
          line-height: 1.4;
          font-weight: 600;
          transition: all 0.2s;
          color: var(--text-color);
        }
        p {
          color: var(--text-color2);
          font-size: 14px;
          line-height: 1.54;
        }
      }
    }
    .article-card-content {
      height: 44px;
      padding: 5px 0;
      p {
        height: 44px;
        overflow: hidden;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        text-overflow: ellipsis;
        font-size: 14px;
        color: var(--text-color1);
      }
    }
    .article-card-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      span {
        font-size: 12px;
        color: var(--text-color2);
      }
      .views-comment-icon {
        display: flex;
        align-items: center;
        gap: 4px;
				image {
					width: 20px;
					height: 20px;
				}
        span {
          display: flex;
          align-items: center;
          gap: 2px;
        }
      }
    }
    &:hover {
      .article-card-header-title {
        .p-h3 {
          color: #0aa9db;
        }
      }
    }
  }
}
</style>
