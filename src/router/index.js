import Vue from 'vue'
import VueRouter from 'vue-router'
import Storage from 'sync-storage-listener';
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import store from '@/store';
import {getRightPath, createRoutesByStoreRoutes, createRoutesByUserInfo,splitRoutesByIsLogin} from '@/utils/routerMethods';
import systemRoutes from './systemRoutes'
import baseRoutes from './baseRoutes';
import { deepCopy } from '@/utils/common'
import { routerConfig } from '@/config/setting'
import EventBus from '@/utils/eventbus';
const copySystemRouter = deepCopy(systemRoutes)
const [defaultRoutes,addSystemRoutes]=splitRoutesByIsLogin(baseRoutes,copySystemRouter,routerConfig,'/')
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
  routes: defaultRoutes,
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
  return router.addRoutes(addRoutes || createRoutesByStoreRoutes(userRoutes,addSystemRoutes))
}
export function makeRoutesByStoreInfo(userInfo) {
  return createRoutesByUserInfo(userInfo,routerConfig,addSystemRoutes)
}
export default router