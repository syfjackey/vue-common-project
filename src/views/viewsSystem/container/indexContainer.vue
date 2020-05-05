<template>
    <div>
           <div>
            <div>
                路由测试
                <button @click="login">登录账号 admin 3级</button>
                <button @click="logout">登出</button>
            </div>
            <div>
                <div><router-link to="/viewsSystem/no2">默认路由 --- 无限制路由</router-link></div>
            </div>
            <div>
                <div><router-link to="/viewsSystem/nox">默认路由 --- 不存在路由</router-link></div>
            </div>
            <div>
                <div><router-link to="/viewsSystem/no3/p2">默认路由 --- 需登录路由 无限权限</router-link></div>
                <div>
                    <router-link to="/viewsSystem/no3/p1/q1">默认路由 --- 需登录路由 权限admin 5级</router-link>
                </div>
                <div>
                    <router-link to="/viewsSystem/no3/p1/q2">默认路由 --- 需登录路由 权限admin 1级</router-link>
                </div>
                <div>
                    <router-link to="/viewsSystem/no3/p1/q3">默认路由 --- 需登录路由 权限user</router-link>
                </div>
            </div>
            <br />
            <br />
            <div>
                <div><router-link to="/manageSystem/test/acc1">新增路由 --- 需登录路由</router-link></div>
                <div>
                    <router-link to="/manageSystem/test/acc3">新增路由 --- 需登录路由 权限admin 8级</router-link>
                </div>
                <div>
                    <router-link to="/manageSystem/test/acc6">新增路由 --- 需登录路由 权限admin 2级</router-link>
                </div>
                <div>
                    <router-link to="/manageSystem/test/acc5">新增路由 --- 需登录路由 权限admin 2级</router-link>
                </div>
                <div>
                    <router-link to="/manageSystem/test/acc7">新增路由 --- 需登录路由 权限worker</router-link>
                </div>
            </div>
        </div>
        <router-view /></div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
    name: 'Home',
    data() {
        return {}
    },
    computed: {
        // 使用对象展开运算符将 getter 混入 computed 对象中
        ...mapGetters([
            'userInfo',
            'userToken'
            // ...
        ])
    },
    methods: {
        async request() {
            let ax1 =await this.$ajax.request(
                {
                    url:
                        'http://localhost:8080/mock/login?returnType=success',
                        params:{
                            id:123
                        },
                        data:{
                            key:111
                        },
                        
                },
                (err) => console.log(err)
            )
            console.log(ax1);
            
            
        },
        login() {
            let userInfo = {
                // 设置 角色
                role: 'admin',
                level: 3
            }
            let userToken = '456789fghnjmkfghjkl'
            this.$store.dispatch('login', [userInfo, userToken])
        },
        logout() {
            this.$store.dispatch('logout')
        }
    }
}
</script>