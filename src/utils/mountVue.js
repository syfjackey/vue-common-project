import Storage from 'sync-storage-listener'
import OptimizeAjax from '@/utils/ajax/optimize-ajax'
import EventBus from './eventbus';
import { storageConfig, ajaxConfig } from '@/config/setting'
export default {
  install(Vue) {
    if (Vue.prototype['$publicPath']) console.warn(`$publicPath已存在,原功能将被覆盖!`);
    Vue.prototype.$publicPath = process.env.BASE_URL
    Vue.use(Storage, storageConfig)
    Vue.use(OptimizeAjax, ajaxConfig)
    Vue.use(EventBus)
  }
}