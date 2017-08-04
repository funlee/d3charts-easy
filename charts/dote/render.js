/**
 * @Author:       lee
 * @Email:        i@funlee.cn
 * @DateTime:     2017-07-15 12:10:08
 * @Description:  绘制柱状图
 */
import defaultCfg from './config'

import getCfg from '../common/config'
import getSvg from '../common/svg'

export default (element, userCfg, data) => {
    const log = console.log.bind(console)

    log('start render dote-chart')

    let renderCfg = getCfg(defaultCfg, userCfg)

    let svg = getSvg(element, renderCfg)

    let width = parseInt(svg.style('width'), 10) - renderCfg.grid.left - renderCfg.grid.right
    let height = parseInt(svg.style('height'), 10) - renderCfg.grid.top - renderCfg.grid.bottom

    let dataset = []

    let xScale = d3.scale.linear()
                .domain([10,60])
                .range([0,width])

    let yScale = d3.scale.linear()
                .domain([30,80])
                .range([0,height])


    //散点包裹的容器
    let isCirWrap = svg.select('.cir-wrap').empty()
    let cirWrap
    if(isCirWrap) {
        cirWrap = svg.append('g').attr('class','cir-wrap')
    } else {
        cirWrap = svg.select('.cir-wrap')
    }

    cirWrap.classed('active-dote',false).transition()
                        .delay(2000)
                        .attr('class','active-dote cir-wrap')

    let cirWrapUpdate = cirWrap.selectAll('circle')
                        .data(data)
    cirWrapUpdate.enter().append('circle')
    cirWrapUpdate.exit().remove()

    let cirWrapItem = cirWrap.selectAll('circle')
                        .data(data)
                        .attr({
                            'cx':d=>{return xScale(d.age)},
                            'cy':d=>{return height-yScale(d.weight)},
                            'r':8,
                            'fill':'#E9EBEE'
                        })
                        .style({
                            'cursor':'pointer'
                        })
                        


    let xAxis = d3.svg.axis()
                .scale(xScale)
                .orient('bottom')
                .tickValues([10,20,30,40,50,60])
                .tickFormat(d=>{
                    return d + '岁'
                })

    let yAxis = d3.svg.axis()
                .scale(yScale)
                .orient('left')
                .tickValues([30,40,50,60,70,80])
                .tickFormat(d=>{
                    return d + 'kg'
                })

    let isXAxis = svg.select('.x-axis').empty()
    let xAxisG
    if(isXAxis) {
        xAxisG = svg.append('g').attr('class','x-axis axis')
    } else {
        xAxisG = svg.select('.x-axis')
    }

    xAxisG.attr('transform', 'translate(0,' + height + ')')
        .call(xAxis)

    //重新设置y轴比例尺的值域，与原来的相反
    yScale.range([height, 0]);

    let isYAxis = svg.select('.y-axis').empty()
    let yAxisG
    if(isYAxis) {
        yAxisG = svg.append('g').attr('class','y-axis axis')
    } else {
        yAxisG = svg.select('.y-axis')
    }

    yAxisG.attr('transform', 'translate(0,0)')
        .call(yAxis)

}
