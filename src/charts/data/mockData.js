import Mock from 'mockjs'
export default {
  bar: Mock.mock(/\.bar/, {
    'code': 1,
    'data|10-12': [{
      'name': '@cname',
      'value|100-1000': 10
    }]
  }),
  line: Mock.mock(/\.line/, {
    'code': 1,
    'data': {
      'line1|12': [{
        'value|100-150': 100
      }],
      'line2|12': [{
        'value|100-180': 100
      }],
      'line3|12': [{
        'value|100-160': 100
      }]
    }
  }),
  area: Mock.mock(/\.area/, {
    'code': 1,
    'data|12': [{
      'value|100-150': 100
    }]
  }),
  pie: Mock.mock(/\.pie/, {
    'code': 1,
    'data|4-7': [{
      'name': '@cname',
      'value|100-200': 100
    }]
  }),
  waterBall: Mock.mock(/\.waterBall/, {
    'code': 1,
    'data|2-4': [{
      'name': '@cname',
      'value|1-100': 1
    }]
  }),
  shapeBar: Mock.mock(/\.shapeBar/, {
    'code': 1,
    'data|8': [{
      'name': '@cname',
      'value|100-1000': 10
    }]
  }),
  radar: Mock.mock(/\.radar/, {
    'code': 1,
    'data': {
      'data1|5': [{
        'value|10-100': 10
      }],
      'data2|5': [{
        'value|10-100': 10
      }]
    }
  })
}