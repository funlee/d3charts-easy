/**
 * @Author:       lee
 * @Email:        i@funlee.cn
 * @DateTime:     2017-07-15 11:08:47
 * @Description:  生成图表的mock数据
 * @Last Modified:2017-07-15 11:08:47
 */
import Mock from 'mockjs'

export default {
    bar: Mock.mock(/\.bar/, {
        'code': 1,
        'data|14-18':[
            {
                'name': '@cname()',
                'value|100-1000': 10
            }
        ] 
    }),
    line: Mock.mock(/\.line/, {
        'code': 1,
        'data':{
            'line1|12':[
                {
                    'value|100-150': 100
                }
            ],
            'line2|12':[
                {
                    'value|100-180': 100
                }
            ],
            'line3|12':[
                {
                    'value|100-160': 100
                }
            ]
        }
    }),
    area:Mock.mock(/\.area/, {
        'code': 1,
        'data|12':[
            {
                'value|100-150': 100
            }
        ]
    }),
    pie:Mock.mock(/\.pie/, {
        'code': 1,
        'data|4-7':[
            {
                'name': '@cname()',
                'value|100-200': 100
            }
        ]
    }),
    force:Mock.mock(/\.force/, {
        'code': 1,
        'data|4-7':[
            {
                'name': '@cname()',
                'value|100-200': 100
            }
        ]
    }),
    chord:Mock.mock(/\.chord/, {
        'code': 1,
        'data|4-7':[
            {
                'name': '@cname()',
                'value|100-200': 100
            }
        ]
    }),
    tree:Mock.mock(/\.tree/, {
        'code': 1,
        'data|4-7':[
            {
                'name': '@cname()',
                'value|100-200': 100
            }
        ]
    }),
    ball:Mock.mock(/\.ball/, {
        'code': 1,
        'data|2-4':[
            {
                'name': '@cname()',
                'value|1-100': 1
            }
        ]
    })

}

