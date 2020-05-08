function createDefaultRoutes(baseRoutes, mergeRoutes, path) {
    if (mergeRoutes.length === 0) return baseRoutes
    if (path) {
        const findBaseRoute = baseRoutes.find(r => {
            return r.path === path
        })
        findBaseRoute.children = findBaseRoute.children ? [...findBaseRoute.children, ...mergeRoutes] : mergeRoutes
        return baseRoutes
    }
    return [...baseRoutes, ...mergeRoutes]
}
function splitRoutesByIsLogin(baseRoutes, systemRoutes, routerConfig,path) {
    let mergeRoutes = []
    let addRoutes = []
    for (const val of Object.values(systemRoutes)) {
        if (Array.isArray(val)) {
            val.forEach(v => {
                v.meta && v.meta[routerConfig.loginMeta] ? addRoutes.push(v) : mergeRoutes.push(v)
            })
        } else {
            val.meta && val.meta[routerConfig.loginMeta] ? addRoutes.push(val) : mergeRoutes.push(val)
        }
    }
    const defaultRouter = createDefaultRoutes(baseRoutes, mergeRoutes,path)
    return [defaultRouter, addRoutes]
}
function getRightPath(to, { userToken, userInfo }, routerConfig,path404) {
    if (to.matched.length === 0) { // 如果没匹配到路由 
        return path404
    }
    if (to.path === routerConfig.loginPath && userToken) {
        return routerConfig.loginRedirect
    }
    if (to.matched.some(res => res.meta[routerConfig.loginMeta])) {
        let isAllow = (!!userToken) && isRightRole(to.meta, userInfo, routerConfig)
        return isAllow ? null : routerConfig.unLoginRedirect;
    }
    return null
}
function isRightRole(meta, userInfo, { roleMeta, unRoleMeta }) {
    if (!meta) return true
    const metaRole = meta[roleMeta]
    const metaERole = meta[unRoleMeta]
    if (metaRole) {
        return checkRole(metaRole, userInfo, true)
    }
    if (metaERole) {
        return !checkRole(metaERole, userInfo, false)
    }
    return true
}
function checkRole(mRole, userInfo, isIncludeType) {
    if (typeof mRole === 'string') return checkRoleString(mRole, userInfo, isIncludeType)
    if (Array.isArray(mRole)) {
        return !!mRole.find((role) => {
            return checkRoleString(role, userInfo, isIncludeType)
        })
    }
    return isIncludeType
}
function checkRoleString(mRole, { role, level = 0 }, isIncludeType) {
    if (typeof mRole === 'string') {
        let arr = mRole.split('|')
        if (arr[0] === role) {
            return isIncludeType ? level >= parseInt(arr[1] || 0, 10) : level <= parseInt(arr[1] || 0, 10)
        }
    }
    return false
}
function createRoutesByStoreRoutes(routes, loginRouter) {
    return routes.length > 0 ? filterRoutesByStoreRoutes(routes, loginRouter) : []
}
function filterRoutesByStoreRoutes(userRoutes, loginRouter) {
    let addRoutes = []
    for (let i = 0; i < userRoutes.length; i++) {
        let route = userRoutes[i];
        let children = null
        if (route.children && route.children.length > 0) {
            children = filterRoutesByStoreRoutes(route.children, loginRouter)
        }
        route = replaceNativeRoute(route.fnStr, loginRouter)
        children && (route.children = children)
        addRoutes.push(route)
    }
    return addRoutes;
}
function replaceNativeRoute(fnStr, loginRouter) {
    // eslint-disable-next-line no-new-func
    let r = new Function('loginRouter', `return ${fnStr}`)
    return r(loginRouter)
}
function createRoutesByUserInfo(userInfo, routerConfig, loginRouter) {
    return filterRoutesByUserInfo(loginRouter, userInfo, routerConfig, 'loginRouter')
}
function filterRoutesByUserInfo(routes, userInfo, routerConfig, parentFnStr, parentPath) {
    let addRoutes = []
    let routesMap = []
    if (routes && routes.length > 0) {
        routes.forEach((route, index) => {
            let r
            let m
            if (isRightRole(route.meta, userInfo, routerConfig)) {
                let path = route.path[0] === '/' ? route.path : `${parentPath}/${route.path}`
                let fnStr = `${parentFnStr}[${index}]`
                r = route
                m = {
                    ...route,
                    path,
                    ...route.meta,
                    fnStr
                };
                let [ar, rm] = filterRoutesByUserInfo(route.children, userInfo, routerConfig, `${fnStr}['children']`, path)
                r.children = ar
                m.children = rm
                delete m['meta']
                delete m['component']
            }
            r && addRoutes.push(r)
            m && routesMap.push(m)
        })
    }
    return [addRoutes, routesMap]
}
export { getRightPath, createRoutesByStoreRoutes, createRoutesByUserInfo, splitRoutesByIsLogin }