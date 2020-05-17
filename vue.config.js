const SystemConfig = require('./src/config/system.config')
const path = require('path')
function resolve(dir) {
    return path.join(__dirname, dir)
}
const IS_PROD = ['production', 'prod'].includes(process.env.NODE_ENV);
module.exports = {
    assetsDir: SystemConfig.assetsDir,
    publicPath: SystemConfig.publicPath,
    productionSourceMap: false,
    chainWebpack: config => {
        config
            .plugin('html')
            .tap(args => {
                args[0].title = SystemConfig.title
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
                symbolId: `${SystemConfig.iconPrefix}-[name]`
            })
            .end()
        if (IS_PROD) {
            //     // 需要翻墙安装 npm i -D image-webpack-loader
            //     // config.module
            //     // .rule("images")
            //     // .use("image-webpack-loader")
            //     // .loader("image-webpack-loader")
            //     // .options({
            //     //     mozjpeg: { progressive: true, quality: 75 },
            //     //     optipng: { enabled: false },
            //     //     pngquant: { quality: [0.75, 0.9], speed: 4 },
            //     //     gifsicle: { interlaced: false },
            //     //     webp: { quality: 75 }
            //     // });
        }

    }
}

