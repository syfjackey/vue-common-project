import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import mountVue from '@/utils/mountVue'
import { openMock, storageConfig, ajaxConfig } from '@/config/setting'
Vue.config.productionTip = false
Vue.use(mountVue, { storageConfig, ajaxConfig })
process.env.NODE_ENV !== 'production' && openMock && require('@/mock')
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')

