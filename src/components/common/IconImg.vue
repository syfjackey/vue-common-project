<template>
    <svg v-if="type === 'svg'" class="svg-icon" aria-hidden="true">
        <use :href="`#${iconName}`" />
    </svg>

    <i
        v-else-if="type === 'img'"
        class="img-icon"
        :style="{ backgroundImage: `url(${bgimg})` }"
    ></i>

    <i v-else :class="['iconfont', iconName]"></i>
</template>

<script>
/**
 * #icon-xxx  icon前缀是在system.config.js配置的 通过webpack打包自动注册
 */
export default {
    name: 'IconImg',
    inheritAttrs: false,
    props: {
        name: {
            type: String,
            required: true
        },
        type: {
            type: String,
            default: 'svg'
        }
    },
    computed: {
        iconName() {
            return `icon-${this.name}`
        },
        bgimg() {
            return this.type === 'img' ? require(`@/assets/icons/png/${this.name}.png`) : null
        }
    }
}
</script>

<style>
.svg-icon {
    width: 1em;
    height: 1em;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
}
.img-icon {
    display: inline-block;
    width: 1em;
    height: 1em;
    background: no-repeat center center;
    background-size: cover;
    vertical-align: -0.2em;
}
.iconfont {
    font-family: 'iconfont' !important;
    font-size: 16px;
    font-style: normal;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}
</style>
