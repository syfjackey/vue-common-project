class EventBus {
    static _cacheEventMap = {}
    static on(key, fn) {
        if (this._cacheEventMap[key]) {
            this._cacheEventMap[key].push(fn)
        } else {
            this._cacheEventMap[key] = [fn]
        }
    }
    static off(key, fn) {
        let callbacks = this._cacheEventMap[key]
        this._cacheEventMap[key] = callbacks && callbacks.filter(f => f !== fn)
        return this
    }
    static emit(key, ...args) {
        console.log(key);
        
        const callbacks = this._cacheEventMap[key]
        callbacks&&callbacks.forEach(fn => fn(...args))
    }
    static once(key, fn) {
        let wrapFanc = (...args) => {
            fn(...args)
            this.off(key, wrapFanc)
        }
        this.on(key, wrapFanc)
    }
    static install(Vue, { mountKey } = { mountKey: '$eventBus' }) {
        if (Vue.prototype[mountKey]) console.warn(`${mountKey}已存在,原功能将被覆盖!`);
        Vue.prototype[mountKey] = this
    }
}
export default EventBus