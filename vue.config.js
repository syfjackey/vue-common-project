const SystemConfig = require('@/src/config/system.config')

module.exports = {
    assetsDir: SystemConfig.assetsDir,
    publicPath: SystemConfig.publicPath,
   
    chainWebpack: config => {
        config
            .plugin('html')
            .tap(args => {
                args[0].title = SystemConfig.title
                return args
            })
    }
}

