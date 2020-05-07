import Vue from 'vue'
import VueRouter from 'vue-router'
import Storage from 'sync-storage-listener';
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import store from '@/store';
import { createDefaultRouter, getRightPath, createRoutesByStoreRoutes, createRoutesByUserInfo,splitRoutesByIsLogin} from '@/utils/routerMethods';
import systemRouter from './systemRouter'
import baseRouter from './baseRouter';
import { deepCopy } from '@/utils/common'
import { routerConfig } from '@/config/setting'
import EventBus from '@/utils/eventbus';
const copySystemRouter = deepCopy(systemRouter)
let [noLoginRouter, loginRouter] = splitRoutesByIsLogin(copySystemRouter,routerConfig)
const defaultRouter= createDefaultRouter(baseRouter,noLoginRouter)
NProgress.configure({ showSpinner: false })
Vue.use(VueRouter)
EventBus.on('login', emitLogin)
EventBus.on('logout', emitLogout)
function emitLogin() {  
  store.dispatch('login', null)
}
function emitLogout() {
  store.dispatch('logout')
}
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: defaultRouter,
})
router.beforeEach((to, from, next) => { 
  NProgress.start();
  Storage.ready().then(() => {
    const UserStore = {
      userToken: store.getters.userToken,
      userInfo: store.getters.userInfo
    }
    let path = getRightPath(to, UserStore,routerConfig)
    path ? next({path}) : next()
  })
})
router.afterEach(() => {
  NProgress.done()
})
export function fixRoutes(addRoutes, userRoutes) {
  console.log(addRoutes, userRoutes);
  
  return router.addRoutes(addRoutes || createRoutesByStoreRoutes(userRoutes,loginRouter))
}
export function makeRoutesByStoreInfo(userInfo) {
  return createRoutesByUserInfo(userInfo,routerConfig,loginRouter)
}
export default router