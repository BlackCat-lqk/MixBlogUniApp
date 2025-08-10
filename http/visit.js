import {
	get, post
} from '@/utils/request';
import axios from 'axios'

// 获取访问统计数据
export function getVisitStatsApi(params) {
	
	return get('/visit-stats', params, {
		loading: false, // 是否显示loading
		showError: false, // 是否显示错误信息
		// header: {} // 自定义请求头
	})
}

// 统计访问量记录
export function recordVisitApi(params) {
	
	return post('/record-visit', params, {
		loading: false, // 是否显示loading
		showError: false, // 是否显示错误信息
		// header: {} // 自定义请求头
	})
}

// 查询访问IP
export function getVisitorIpApi(params) {
	
	const service = axios.create({
	  baseURL: '',
	  timeout: 30000, // 请求超时时间
	})
	  return service.get('https://ipinfo.io/json')
}