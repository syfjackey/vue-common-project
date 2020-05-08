
import IndexContainer from '@/views/indexContainer'
import ErrorContainer from '@/views/errorPage/container/indexContainer'
import Build from '@/views/errorPage/build'
import Error404 from '@/views/errorPage/404'
import Error500 from '@/views/errorPage/500'

// 默认路由表
const baseRoutes = [{
    path: '/',
    name: 'Home',
    component: IndexContainer,
    redirect:'/viewsSystem'
},
{
    path: '/error',
    name: '错误',
    component: ErrorContainer,
    children: [{
        path: 'build',
        name: '建设中',
        component: Build,
    },
    {
        path: '404',
        name: '404',
        component: Error404
    },
    {
        path: '500',
        name: '500',
        component: Error500
    }
    ]
}
]

export default baseRoutes
