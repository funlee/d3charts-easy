/**
 * @Author:       lee
 * @Email:        i@funlee.cn
 * @DateTime:     2017-07-15 12:10:08
 * @Description:  将随机数据传给render函数渲染图表
 * @Last Modified:2017-07-15 12:10:08
 */
import request from '../request'
import '../../mockData/mockData'

import render from './render'

let ele, cfg, catchData

export default (element, userCfg = {}) => {
    ele = element
    cfg = userCfg

    request({
        url: 'd3charts.force',
        dataType: 'json'
    }, (data) => {

        catchData = data.data

        render(element, userCfg, data.data)
        bindEvent()
    })
}

const bindEvent = () => {
    d3.select('.up-btn').on('click', () => {
        request({
            url: 'd3charts.force',
            dataType: 'json'
        }, (data) => {
            catchData = data.data

            render(ele, cfg, data.data)
        })
    })

    d3.select('.sz-btn').on('click', () => {
        catchData.sort((a, b) => {
            return a.value - b.value
        })
        render(ele, cfg, catchData)
    })

    d3.select('.dj-btn').on('click', () => {
        catchData.sort((a, b) => {
            return b.value - a.value
        })
        render(ele, cfg, catchData)
    })
}