import IndexContainer from '@/views/manageSystem/container/indexContainer'
export default [{
    path: '/manageSystem',
    name: 'manageIndex',
    component: IndexContainer,
    meta: {
        requiresAuth: true
    }
}]

