import IndexContainer from '@/views/viewsSystem/container/indexContainer'
import no from './../test/router/no';
export default [{
    path: '/viewsSystem',
    name: 'viewsHome',
    component: IndexContainer,
    redirect:'/viewsSystem/test',
    children:[...no]
}]