import {
	get
} from '@/utils/request';

// 获取访问统计数据
export function getVisitStatsApi(params) {
	
	return get('/visit-stats', params, {
		loading: false, // 是否显示loading
		showError: false, // 是否显示错误信息
		// header: {} // 自定义请求头
	})
}