/**
 * 分步加载
 * imp Defer from xxx
 * 使用Vue mixins 混入到 组件  
 * 全局混入 Vue.mixin(Defer())
 * 组件混入 mixins:[Defer()]
 * 可传参数 代表分多少步 
 * @param {*} count 
 * 
 * 主要解决 一次性大量渲染上万条数据 造成页面卡顿
 * 
 * 组件挂在后 会按照r 0->count 顺序 依将displayPriority 加上去
 * 这样就可以通过 函数defer 或者自己判断 displayPriority 值 来依次显示每次渲染加载的数据
 *  <template v-if="defer(0)">
 *     <Heavy v-for="n in 1000" :key="n"/>
 *   </template>
 *  <template v-if="defer(1)">
 *     <Heavy v-for="n in 1001,2000" :key="n"/>
 *   </template>
 * 
 */
const defer = function (count = 10) {
    return {
        data() {
            return {
                displayPriority: 0
            }
        },

        mounted() {
            this.runDisplayPriority()
        },

        methods: {
            runDisplayPriority() {
                const step = () => {
                    requestAnimationFrame(() => {
                        this.displayPriority++
                        if (this.displayPriority < count) {
                            step()
                        }
                    })
                }
                step()
            },

            defer(priority) {
                return this.displayPriority >= priority
            }
        }
    }
}
export { defer }