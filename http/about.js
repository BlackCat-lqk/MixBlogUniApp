import {
	post
} from '@/utils/request';

// 获取slogan数据
export function getAboutConfigApi(params) {
	
	return post('/getAbout', params, {
		loading: false, // 是否显示loading
		showError: false, // 是否显示错误信息
		// header: {} // 自定义请求头
	})
}