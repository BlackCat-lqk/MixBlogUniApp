import {
	get
} from '@/utils/request';
console.log('fff')
// 用户相关接口

// 获取访问统计数据
export function getVisitStatsApi(params){
	get('/visit-stats', params, {
			loading: false, // 是否显示loading
			showError: false, // 是否显示错误信息
			// header: {} // 自定义请求头
		})
		.then(data => {
			console.log('数据:', data);
			return data;
		})
		.catch(err => {
			console.error('获取用户失败:', err);
			return err
		});
}