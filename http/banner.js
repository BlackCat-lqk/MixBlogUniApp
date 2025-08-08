import {
	get
} from '@/utils/request';

// 获取banner数据
export function getAllBanners(params) {
	
	return get('/getBanner', params, {
		loading: false, // 是否显示loading
		showError: false, // 是否显示错误信息
		// header: {} // 自定义请求头
	})
}