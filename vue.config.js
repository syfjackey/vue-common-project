const SystemConfig = require('./src/config/system.config')
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin; // 打包分析
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
        if (IS_PROD) {
            config.plugin("webpack-report").use(BundleAnalyzerPlugin, [
                {
                    analyzerMode: "static"
                }
            ]);
            // 需要翻墙安装 npm i -D image-webpack-loader
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

}

