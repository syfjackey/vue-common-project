import Build from '@/views/errorPage/build'
export default [{
    path: 'test',
    name: 'ne4',
    component: Build,
    meta: {
        requiresAuth: true,
        role: ['admin', 'woker'],        
    },
    children: [{
        path: 'acc1',
        name: 'acc1',
        component: Build
    }, {
        path: 'acc2',
        name: 'acc2',
        component: Build, meta: {
            requiresAuth: true,
        }
    }, {
        path: 'acc3',
        name: 'acc3',
        component: Build, meta: { 
            requiresAuth: true,
            urole: 'admin|8'
        }
    }, {
        path: 'acc4',
        name: 'acc4',
        component: Build, meta: {
            requiresAuth: true,
            urole: ['admin|3','woker']
        }
    }, {
        path: 'acc5',
        name: 'acc5',
        component: Build, meta: {
            requiresAuth: true,
            role: ['woker','admin|2']
        }
    }, {
        path: 'acc6',
        name: 'acc6',
        component: Build, meta: {
            requiresAuth: true,
            role: 'admin|2'
        }
    }, {
        path: 'acc7',
        name: 'acc7',
        component: Build, meta: {
            requiresAuth: true,
            role: 'woker'
        }
    }]
}]