<template>
    <div>
        建设页面==
        {{ userInfo }}========{{ userToken }}
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
    computed: {
        // 使用对象展开运算符将 getter 混入 computed 对象中
        ...mapGetters([
            'userInfo',
            'userToken'
            // ...
        ])
    }
};
</script>

<style></style>
