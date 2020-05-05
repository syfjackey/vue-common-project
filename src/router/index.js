import Vue from 'vue'
import VueRouter from 'vue-router'
import Storage from 'sync-storage-listener';
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import EventBus from '@/utils/eventbus';
import store from '@/store';
import { defaultRouter, getRightPath, createRoutesByStoreRoutes, createRoutesByUserInfo } from './methods';
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
export function fixRoutes(addRoutes, userRoutes) {
  return router.addRoutes(addRoutes || createRoutesByStoreRoutes(userRoutes))
}
export function makeRoutesByStoreInfo(userInfo) {
  return createRoutesByUserInfo(userInfo)
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
    let path = getRightPath(to, UserStore)
    path ? next({path}) : next()
  })
})
router.afterEach(() => {
  NProgress.done()
})
export default router