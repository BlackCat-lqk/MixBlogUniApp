
// #ifndef VUE3
import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import App from './App.vue'
export function createApp() {
  const app = createSSRApp(App)
	const pinia = createPinia()
	pinia.use(piniaPluginPersistedstate)
	app.use(pinia)
  return {
    app,
		pinia
  }
}
// #endif