
import { mock } from "mockjs"
import { param2Obj } from '@/utils/common';


const login = {
    url: '/mock/login',
    callback: opt => {
        let paramsObj = param2Obj(opt.url)
        let returnType = paramsObj.returnType || 'success'
        let template = {
            success: {
                resultCode: 0,
                message: '返回成功',
                data: {
                    userInfo: {
                        'level|1-10': 1,
                        role: "admin"
                    },
                    userToken: '@string("lower",32)',
                    "rows|10":[
                        {
                            name:'@cname'
                        }
                    ]
                }
            },
            error: {
                resultCode: -1,
                message: '登录失败',
                data: {
                }
            }
        }
        return mock(template[returnType])
    }
}



export default { login }