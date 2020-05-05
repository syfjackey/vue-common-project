
/**
 * paramToObj 函数
 * URLSearchParams ie兼容问题 
 * 将url中参数转成Object
 */
function param2Obj(url) {
    let search = url.replace(/^\s+/, '').replace(/\s+$/, '').match(/([^?#]*)(#.*)?$/);
    if (!search) {
        return {};
    }
    let searchStr = search[1];
    let searchHash = searchStr.split('&');
    let ret = {};
    searchHash.forEach(function (pair) {
        let temp = (pair.split('=', 1))[0];
        if (temp) {
            let key = decodeURIComponent(temp);
            let value = pair.substring(key.length + 1);
            if (value !== undefined) {
                value = decodeURIComponent(value);
            }
            if (key in ret) {
                if (ret[key].constructor !== Array) {
                    ret[key] = [ret[key]];
                }
                ret[key].push(value);
            } else {
                ret[key] = value;
            }
        }
    });
    return ret;
}
/**
 * 深拷贝
 * @param {*} obj 拷贝对象(object or array)
 * @param {*} cache 缓存数组
 */
function deepCopy(obj, cache = []) {
    // typeof [] => 'object'
    // typeof {} => 'object'
    if (obj === null || typeof obj !== 'object') {
        return obj
    }
    // 如果传入的对象与缓存的相等, 则递归结束, 这样防止循环
    /**
     * 类似下面这种
     * var a = {b:1}
     * a.c = a
     */
    const hit = cache.filter(c => c.original === obj)[0]
    if (hit) {
        return hit.copy
    }

    const copy = Array.isArray(obj) ? [] : {}
    // 将copy首先放入cache, 因为我们需要在递归deepCopy的时候引用它
    cache.push({
        original: obj,
        copy
    })
    Object.keys(obj).forEach(key => {
        copy[key] = deepCopy(obj[key], cache)
    })

    return copy
}
/**
 * 冻结数据 解除响应
 * @param {any} val 
 */
function freezeData(val) {
    return Object.freeze(val)

}
/**
 * 判断是否为null或者undefined
 * @param {*} v 
 */
function isNullOrUndefined(v) {
    return v === null || v === undefined
}
function isType(val, type) {
    return type.toLowerCase() === Object.prototype.toString.call(val).split(' ')[1].replace(']', '').toLowerCase()
}
export { param2Obj, deepCopy, freezeData, isNullOrUndefined, isType }

