import Mock from 'mockjs'
import modules  from './module/index';
Mock.setup({
    timeout: '200-600'
})

for (const module of Object.values(modules)) {
    const { url, type, callback } = module
    Mock.mock(new RegExp(url), type, callback)
}
