import {
	post
} from '@/utils/request';

// 获取notes数据
export function getNotesApi(params) {
	return post('/getNotes', params, {
		loading: false, // 是否显示loading
		showError: false, // 是否显示错误信息
		// header: {} // 自定义请求头
	})
}