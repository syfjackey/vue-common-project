const SystemConfig = require('./src/config/system.config')
const path = require('path')
function resolve(dir) {
    return path.join(__dirname, dir)
}
const IS_PROD = ['production', 'prod'].includes(process.env.NODE_ENV)

// cdn链接
const cdn = {
    // cdn：模块名称和模块作用域命名（对应window里面挂载的变量名称）
    externals: {
        vue: 'Vue',
        vuex: 'Vuex',
        'vue-router': 'VueRouter',
        nprogress: 'NProgress',
        axios: 'axios'
    },
    // cdn的css链接
    css: ['https://lib.baomitu.com/nprogress/0.2.0/nprogress.min.css'],
    // cdn的js链接
    js: [
        'https://lib.baomitu.com/vue/2.6.11/vue.min.js',
        'https://lib.baomitu.com/vuex/3.1.3/vuex.min.js',
        'https://lib.baomitu.com/vue-router/3.1.3/vue-router.min.js',
        'https://lib.baomitu.com/nprogress/0.2.0/nprogress.min.js',
        'https://lib.baomitu.com/axios/0.19.2/axios.min.js'
    ]
}
module.exports = {
    assetsDir: SystemConfig.assetsDir,
    publicPath: SystemConfig.publicPath,
    productionSourceMap: false,
    chainWebpack: (config) => {
        config.plugin('html').tap((args) => {
            args[0].title = SystemConfig.title
            if (IS_PROD && SystemConfig.openCdn) {
                args[0].cdn = cdn
            }
            return args
        })
        // set svg-sprite-loader
        config.module
            .rule('svg')
            .exclude.add(resolve('src/assets/icons'))
            .end()
        config.module
            .rule('icons')
            .test(/\.svg$/)
            .include.add(resolve('src/assets/icons'))
            .end()
            .use('svg-sprite-loader')
            .loader('svg-sprite-loader')
            .options({
                symbolId: 'icon-[name]'
            })
            .end()
        if (IS_PROD) {
            //     //  npm i -D image-webpack-loader
            // config.module
            // .rule("images")
            // .use("image-webpack-loader")
            // .loader("image-webpack-loader")
            // .options({
            //     mozjpeg: { progressive: true, quality: 75 },
            //     optipng: { enabled: false },
            //     pngquant: { quality: [0.75, 0.9], speed: 4 },
            //     gifsicle: { interlaced: false },
            //     webp: { quality: 75 }
            // });
        }
    },
    configureWebpack: (config) => {
        // 用cdn方式引入，则构建时要忽略相关资源
        if (IS_PROD && SystemConfig.openCdn) {
            config.externals = cdn.externals
        }
    }
}
