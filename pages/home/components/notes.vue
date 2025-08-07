<template>
  <view class="article-box">
  	<view class="article-title">随笔随记</view>
  	<notes-card :notesDetail="notesDetail"></notes-card>
  	<button class="more-button" type="primary">更多</button>
  </view>
</template>

<script setup>
	import { ref, reactive, onMounted } from 'vue'
	import NotesCard from '@/pages/components/NotesCard.vue';
	
	const notesDetail = ref({
	  id: '',
	  title: '',
	  content: '',
	  updatedAt: '',
	  weather: '',
	  cover: '',
	})
	
	onMounted(() => {
	  notesDetail.value = {
  "_id": "688d9fc83070f0cd42b6cfe8",
  "uid": "686118610718bf114ed94ef8",
  "email": "1501036045@qq.com",
  "title": "记忆回收日",
  "content": "上午7:15 · 雨中的第37号记忆诊所 我站在诊所门口，任由冷雨顺着脖颈流进衣领。玻璃门上的全息投影广告循环播放着：「厌倦了痛苦的回忆？『剪影』记忆编辑服务，为您定制全新人生！」 推门时，风铃发出1980年代的老式电子音——这是老板的恶趣味。柜台后的男人抬起头，左眼嵌着一枚不断跳动着数据的机械义眼。 「第几次来了？」他推过来一杯冒着诡异蓝光的茶。 「第三次。」我盯着茶杯里浮动的纳米颗粒，「这次想删掉‘她’的全部记忆。」 他忽然笑了：「你知道人类最可笑的是什么吗？总以为删除记忆就能解决问题。」机械眼转动，投影出一段模糊影像——那是我从未见过的画面：我跪在暴雨里，怀里抱着一个浑身是血的女孩。 「这段记忆……不属于我。」我的太阳穴突突跳动。 「当然不属于你。」他敲了敲桌面，「这是上周某个客户删除的。」 --- 中午12:30 · 黑市记忆贩子的交易 地下三层的「数据坟场」弥漫着腐锈的金属味。穿防辐射服的老头从培养舱里扯出一串发光神经纤维：「刚剥离的‘初恋记忆’，附赠1999年的跨年烟花。」 「我要找的是这个。」我调出全息照片——灰白建筑群中央，一座倒悬的黑色钟楼。 老头突然剧烈咳嗽起来，培养舱里的脑组织跟着抽搐：「你疯了？那是‘记忆管理局’的禁区！」他塞给我一枚生物芯片，「拿着这个快滚，里面有段被禁的公共记忆。」 芯片插入终端机的瞬间，我看到了2045年11月11日的真相： 倒悬的钟楼突然直立，所有行人同时静止。天空裂开一道紫色缝隙，无数银白色人形生物降落在钟楼顶端。而画面角落里，赫然是正在拍摄这段视频的——我自己。 --- 傍晚18:45 · 机械乌鸦的警告 公寓的智能管家已经三天没说话了。当我扯开它的电路板时，一只机械乌鸦撞破窗户冲进来，喙部喷出全息火焰： 「他们发现你了！快去看冰箱第三层！」 冷冻室里躺着我的生物识别ID卡，签发日期是2048年——明天。卡片背面用血写着：「不要相信任何会眨眼的电子设备」。 浴室镜子突然显示红色警告：「检测到非法记忆篡改」。我砸碎镜面，后面露出微型摄像头，以及一行刻在墙上的字： 「你删掉的不是痛苦，是证据。」 --- 深夜23:59 ——记忆诊所的机械眼珠炸开，露出钟楼顶端的银色生物； ——乌鸦衔着ID卡飞向紫色裂缝，卡面照片渐渐变成那个血泊中的女孩； ——冰箱里的冷冻肉长出我的脸，嘶吼着「我们都被编辑过」； ——全城电子屏同时闪烁：倒计时00:00，所有静止的行人突然转向我的窗口。 我抓起茶几上的记忆删除器对准太阳穴，却听到自己从未听过的声音： 「这次，轮到你来记住真相了。」",
  "weather": "pour",
  "cover": "/uploads/notes/compressed/noteImages-1754111944359-840446068.webp",
  "originalCover": "/uploads/notes/noteImages-1754111944359-840446068.jpg",
  "createdAt": "2025-08-02T05:19:04.162Z",
  "updatedAt": "2025-08-02T05:19:06.773Z",
  "__v": 0
}
	})
</script>

<style lang="scss" scoped>
	.article-title {
		font-size: 1rem;
		font-weight: 600;
		padding-left: 15px;
	}
	.more-button{
		margin-top: 20px;
		width: 60px;
		height: 34px;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 0.8rem;
	}
</style>