import EventBus from '@/utils/eventbus';
const routerConfig = {
    roleMeta: 'role',
    unRoleMeta: 'urole',
    loginMeta: 'requiresAuth',
    loginPath: '/login',
    unLoginRedirect: '/xxxx',
    loginRedirect: '/xx',
}
const ajaxConfig = {
    baseURL: process.env.NODE_ENV === 'production' ? '' : '',
    listenerConfig: {
        key: 'resultCode',
        message: 'message',
        listener: {
            '404'() {
                console.log('网页不存在');
            },
            '500'() {
                console.log('服务器故障');
            },
        }
    }
}
const storageConfig = {
    prefix: 'ty',
    storageType: 'sessionStorage',
    callback(keys, vals, type, Storage) {
        const index = keys.includes('userToken')
        index && type === 'clear' && EventBus.emit('logout')
        index && type === 'set' && EventBus.emit('login')
    }
}
const openMock = process.env.NODE_ENV === 'development'
export { routerConfig, ajaxConfig, storageConfig, openMock }