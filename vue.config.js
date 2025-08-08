// export default {
//   server: {
//       proxy: {
//         '/api': {
//           target: 'http://localhost:3000', // 代理目标地址
//           changeOrigin: true,
//         },
//         '/uploads': {
//           target: 'http://localhost:3000', // 代理目标地址
//           changeOrigin: true,
//         },
//       },
//       watch: {
//         usePolling: true,
//         interval: 100,
//       },
//     },
// };

// vue.config.js
module.exports = {
  devServer: {
    proxy: {
      '/api': {  // 代理前缀（必须和请求的 url 一致）
        target: 'http://localhost:3000', // 替换为你的后端地址
        changeOrigin: true, // 必须开启
      },
			'/uploads': {  // 代理前缀（必须和请求的 url 一致）
			  target: 'http://localhost:3000', // 替换为你的后端地址
			  changeOrigin: true, // 必须开启
			},
    },
  },
};