import Storage from 'sync-storage-listener';
import { makeRoutesByStoreInfo, fixRoutes } from '@/router/index';
const userStore = {
    state: {
        userInfo: {
        },
        userToken: '',
        userRoutes: []
    },
    mutations: {
        SET_USER_INFO(state, userInfo) {
            state.userInfo = userInfo
        },
        SET_USER_TOKEN(state, userToken) {
            state.userToken = userToken;
        },
        SET_USER_ROUTES(state, userRoutes) {
            state.userRoutes = userRoutes;
        },
        SET_ARRAY(state, obj) {
            for (const [key, val] of Object.entries(obj)) {
                state[key] = val
            }
        }
    },
    actions: {
        login({ commit }, userStore) { // 登入
            let [userInfo, userToken, userRoutes] = userStore || Storage.getItem(['userInfo', 'userToken', 'userRoutes'])
            let addRoutes
            let routesMap
            if (userStore) {                
                [addRoutes, routesMap] = makeRoutesByStoreInfo(userInfo)
                userRoutes = routesMap
                Storage.setItem([{
                    key: 'userToken', value: userToken
                }, {
                    key: 'userInfo', value: userInfo
                }, {
                    key: 'userRoutes', value: userRoutes
                }])
            }
            commit('SET_ARRAY', { userInfo, userToken, userRoutes });
            fixRoutes(addRoutes, userRoutes)
        },
        logout() { // 登出
            Storage.removeItem(['userToken', 'userInfo', 'userRoutes'])
            location.reload()
        }
    }
}
export default userStore;