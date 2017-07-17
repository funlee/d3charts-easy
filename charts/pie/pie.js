/**
 * @Author:       lee
 * @Email:        i@funlee.cn
 * @DateTime:     2017-07-17 14:51:57
 * @Description:  Description
 */
import request from '../request'
import '../../mockData/mockData'

import render from './render'

let ele, cfg, catchData

export default (element,userCfg={}) => {
    ele = element
    cfg = userCfg

    request({
        url: 'd3charts.pie',
        dataType: 'json'
    }, function(data) {
        catchData = data.data
        render(element,userCfg,data.data)
        bindEvent()
    })
}

const bindEvent = () => {
    d3.select('.up-btn').on('click',function() {
        request({
            url: 'd3charts.pie',
            dataType: 'json'
        }, function(data) {
            catchData = data.data
            
            render(ele,cfg,data.data)
        })
    })

    d3.select('.sz-btn').on('click',function() {
        alert('暂无事件')
    })

    d3.select('.dj-btn').on('click',function() {
        alert('暂无事件')
    })
}




