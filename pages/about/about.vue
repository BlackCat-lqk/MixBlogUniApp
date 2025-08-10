<template>
  <div class="about-main-box">
    <div class="about-content-box">
			<view style="width: 80px; height: 80px; border-radius: 50%; overflow: hidden;">
				<image
			  :src="aboutData.cover"
			  object-fit="cover"
			  lazy="true"
			  alt="about"
				style="width: 100%; height: 100%;"
			/>
			</view>
			<view style="height: 40px; margin-top: 20px;">
				<uni-tag v-for="(tag, idx) in aboutData.tags ? aboutData.tags.split(' ') : []"
              :key="idx"
              type="primary"
							:text="tag"
							:inverted="true"
							:circle="true"
							style="margin: 5px;"
              />
			</view>
			<view>{{aboutData.intro}}</view>
      <div class="about-content">
        <div v-for="(item, idx) in aboutData.modules" :key="idx" class="about-content-item">
          <div class="about-title-content">
            <h3>{{ item.title }}</h3>
            <p>{{ item.content }}</p>
          </div>
          <div v-if="idx == 0" class="about-images-content">
            <image
              src="/uploads/weixin/about2.jpg"
              object-fit="cover"
              lazy="true"
							mode="aspectFit"
              alt="about"
            />
            <image
              src="/uploads/weixin/about3.jpg"
              object-fit="cover"
							mode="aspectFit"
              lazy="true"
              alt="about"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, onMounted  } from 'vue'
import { getAboutConfigApi } from '@/http/about'

const aboutData = reactive({
  intro: '',
  tags: '',
  cover: '',
  modules: [{ title: '', content: '', image: [] }],
})

// 获取About页面的配置
const getAboutConfig = async () => {
  const params = {
    email: '',
    uId: '',
  }
  const response = await getAboutConfigApi(params)
  const res = response.data
  if (res.code === 200) {
    aboutData.tags = res.data.tags
    aboutData.cover = res.data.cover
    aboutData.intro = res.data.intro
    aboutData.modules = res.data.modules
  } else {
    console.log(res.message)
  }
}

onMounted(() => {
  getAboutConfig()
})

</script>

<style scoped lang="scss">

.about-main-box {
  padding: 20px 10px;
	.about-content-box {
		display: flex;
		flex-direction: column;
	}
	.about-content-item {
		display: flex;
		flex-direction: column;
		justify-content: center;
		gap: 12px;
		h3{
			font-size: 18px;
			font-weight: 600;
		}
		p{
			font-size: 14px;
		}
		.about-images-content {
			margin-top: 20px;
			display: flex;
			flex-direction: column;
			gap: 24px;
			image {
				width: auto;
				object-fit: contain;
				border-radius: 8px;
				border: 1px solid #ccc;
				padding: 10px;
				background-color: #ccc;
			}
		}
	}
}
</style>
