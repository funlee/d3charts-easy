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

    log('start render bar-chart')

    let renderCfg = getCfg(defaultCfg, userCfg)

    let svg = getSvg(element, renderCfg)

    let width = parseInt(svg.style('width'), 10) - renderCfg.grid.left - renderCfg.grid.right
    let height = parseInt(svg.style('height'), 10) - renderCfg.grid.top - renderCfg.grid.bottom

    let dataset = []

    dataset = data

    let xData = []

    dataset.map((item) => {
        xData.push(item.name)
    })

    let xScale = d3.scale.ordinal()
        .domain(d3.range(dataset.length))
        .rangeRoundBands([0, width], 0.2)

    let yScale = d3.scale.linear()
        .domain([0, d3.max(dataset, d => {
            return d.value
        }) * 1.2])
        .range([0, height])

    let groupUpdate = svg.selectAll('.bar-item').data(dataset)
    let groupEnter = groupUpdate.enter().append('g').attr('class', 'bar-item')
    //  ---- 机智的解决方案   ---
    groupEnter.append('rect')
    groupEnter.append('text')
    groupUpdate.exit().remove()

    let group = svg.selectAll('.bar-item')

    //value值显示动画
    group.on('mouseover', function() { //不能用箭头函数
            d3.select(this).select('text')
                .transition()
                .duration(1000)
                .attr({
                    'dy': '-1em',
                    'opacity': 1
                })
        })
        .on('mouseout', function() { //不能用箭头函数
            d3.select(this).select('text')
                .transition()
                .duration(1000)
                .attr({
                    'dy': '1em',
                    'opacity': 0
                })
        })

    //绘制柱子
    let barRect = group.select('rect')

    barRect.attr({
            'x': (d, i) => {
                return xScale(i)
            },
            'y': height,
            'width': xScale.rangeBand(),
            'height': 0,
            'cursor': 'pointer'
        })
        .transition()
        .duration(2000)
        .attr({
            'y': d => {
                return height - yScale(d.value)
            },
            'height': d => {
                return yScale(d.value)
            }
        })

    //绘制Value值 -- 机智的解决方案
    // let isBarText = group.select('text')//.empty()
    let barText

    // if (isBarText) {
    //     barText = group.append('text')
    // } else {
        barText = group.select('text')
    // }

    barText.attr({
            'x': (d, i) => {
                return xScale(i)
            },
            'y': d => {
                return height - yScale(d.value)
            },
            'dx': xScale.rangeBand() / 2,
            'dy': '1em',
            'opacity': 0
        })
        .text(d => {
            return d.value
        })

    //添加坐标轴

    //添加X轴
    let xAxisScale = d3.scale.ordinal()
        .domain(xData)
        .rangeRoundBands([0, width], 0.2)

    let xAxis = d3.svg.axis()
        .scale(xAxisScale)
        .orient('bottom');

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

    let yAxis = d3.svg.axis()
        .scale(yScale)
        .orient('left')

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
