<template>
    <div class="home">
        <!-- <div>
            <div>Storage测试区域</div>
        </div>
        <div style="background-color: aquamarine;">
            <button @click="set1">设置Storage通过字符串</button>
            <button @click="set2">设置Storage通过数组</button>
            <button @click="set3">设置Storage通过对象</button>
        </div>
        <div style="background-color: aquamarine;">
            <button @click="clear1">清除Storage通过字符串</button>
            <button @click="clear2">清除Storage通过数组</button>
            <button @click="clear3">清除全部Storage</button>
        </div>
        <div style="background-color: aquamarine;">
            <button @click="get1">获取Storage通过字符串</button>
            <button @click="get2">获取Storage通过数组</button>
        </div> -->
        <div>
            <div>
                路由测试
                <button @click="login">登录账号 admin 3级</button>
                <button @click="logout">登出</button>
            </div>
            <div>
                <div><router-link to="/no2">默认路由 --- 无限制路由</router-link></div>
            </div>
            <div>
                <div><router-link to="/no3/p2">默认路由 --- 需登录路由 无限权限</router-link></div>
                <div>
                    <router-link to="/no3/p1/q1">默认路由 --- 需登录路由 权限admin 5级</router-link>
                </div>
                <div>
                    <router-link to="/no3/p1/q2">默认路由 --- 需登录路由 权限admin 1级</router-link>
                </div>
                <div>
                    <router-link to="/no3/p1/q3">默认路由 --- 需登录路由 权限user</router-link>
                </div>
            </div>
            <br />
            <br />
            <div>
                <div><router-link to="/ne4/acc1">新增路由 --- 需登录路由</router-link></div>
                <div>
                    <router-link to="/ne4/acc3">新增路由 --- 需登录路由 权限admin 8级</router-link>
                </div>
                <div>
                    <router-link to="/ne4/acc6">新增路由 --- 需登录路由 权限admin 2级</router-link>
                </div>
                <div>
                    <router-link to="/ne4/acc5">新增路由 --- 需登录路由 权限admin 2级</router-link>
                </div>
                <div>
                    <router-link to="/ne4/acc7">新增路由 --- 需登录路由 权限worker</router-link>
                </div>
            </div>
        </div>
        <router-view></router-view>
        <div><button @click="request">发送请求</button></div>
    </div>
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
<style>
.bg {
    width: 300px;
    height: 300px;
    background-image: url('~@/assets/images/321.jpg');
}
</style>
