/**
 * @Author:       lee
 * @Email:        i@funlee.cn
 * @DateTime:     2017-08-04 14:28:17
 */
import defaultCfg from './config'

import getCfg from '../common/config'
import getSvg from '../common/svg'

export default (element, userCfg, data) => {
    const log = console.log.bind(console)

    log('start render tile-chart')

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

    //制作蒙版
    let isSpartLine = svg.select('.spart-line').empty()
    let spartLine
    if(isSpartLine) {
        spartLine = svg.select('#maskLine').append('g').attr('class','spart-line')
        for(let i = 0;i < 20;i++) {
            spartLine.append('line').attr({
                'x1':0,
                'y1':i * 20,
                'x2':900,
                'y2':i * 20
            })
        }
    }

    let xScale = d3.scale.ordinal()
        .domain(d3.range(dataset.length))
        .rangeRoundBands([0, width], 0.4)

    let yScale = d3.scale.linear()
        .domain([0, d3.max(dataset, d => {
            return d.value
        }) * 1.2])
        .range([0, height])


    let groupUpdate = svg.selectAll('.bar-item').data(dataset)
    let groupEnter = groupUpdate.enter().append('g').attr('class', 'bar-item')
    
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
            'mask':'url(#maskLine)',
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

    //绘制Value值
    let barText
    barText = group.select('text')

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
}
