import IndexContainer from '@/views/manageSystem/container/indexContainer'
import need from './../test/router/need';
export default [{
    path: '/manageSystem',
    name: 'manageHome',
    component: IndexContainer,
    redirect:'/manageSystem/test',
    meta: {
        requiresAuth: true
    },
    children: [...need]
}]

