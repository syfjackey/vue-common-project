import Build from '@/views/errorPage/build'
export default [{
    path: 'test',
    name: 'no1',
    component: Build,
}, {
    path: 'no2',
    name: 'no2',
    component: Build,
}, {
    path: 'no3',
    name: 'no3',
    component: Build,
    children: [
        {
            path: 'p1',
            name: 'p1',
            component: Build,
            meta: {
                requiresAuth: true
            },
            children: [
                {
                    path: 'q1',
                    name: 'q1',
                    component: Build,
                    meta:{role:'admin|5'}
                },{
                    path: 'q2',
                    name: 'q2',
                    component: Build,
                    meta:{role:'admin|1'}
                },{
                    path: 'q3',
                    name: 'q3',
                    component: Build,
                    meta:{role:'user'}
                }
            ]

        }, {
            path: 'p2',
            name: 'p2',
            component: Build,
            meta: {
                requiresAuth: true
            },
        }
    ]
}]