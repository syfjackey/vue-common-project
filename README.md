# vue-common-prohect

## 如何使用?
```
npm install
```
### 目录说明

    public                  // 公共文件存放位置
    .eslintrc.js            // esLint规则
    .prettierrc.js          // prettier规则
    vue.config.js           // vuecli配置文件
    src                     // 开发文件
        assets              // 静态文件位置
        commponents         // 通用组件
        config              // 配置文件
            setting.js          // 基础配置
            system.config.js    // 项目配置
        mixins              // mixin混入
        mock                // 模拟数据
        router              // 路由配置
        utils               // 常用工具
        views               // 开发页面
            errorPage       // 错误页面
                container       // 基础容器
            manageSystem    // 管理页面
                container       // 基础容器
                router          // 路由配置
            viewsSystem     // 普通页面
                container       // 基础容器
                router          // 路由配置