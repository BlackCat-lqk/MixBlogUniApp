import {
	get
} from '@/utils/request';

// 获取photos数据
export function getPhotoLibraryApi(params) {
	return get('/getPhotoLibrary', params, {
		loading: false, // 是否显示loading
		showError: false, // 是否显示错误信息
		// header: {} // 自定义请求头
	})
}