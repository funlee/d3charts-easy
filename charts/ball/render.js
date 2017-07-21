/**
 * @Author:       lee
 * @Email:        i@funlee.cn
 * @DateTime:     2017-07-15 12:10:08
 * @Description:  折线图
 * @Last Modified:2017-07-15 12:10:08
 */
import defaultCfg from './config'

import getCfg from '../common/config'
import getSvg from '../common/svg'

export default (element, userCfg, data) => {
    const log = console.log.bind(console)

    log('start render ball-chart')

    let renderCfg = getCfg(defaultCfg, userCfg)

    let svg = getSvg(element, renderCfg)

    let width = parseInt(svg.style('width'), 10) - renderCfg.grid.left - renderCfg.grid.right
    let height = parseInt(svg.style('height'), 10) - renderCfg.grid.top - renderCfg.grid.bottom

    log(data)

    // let dataset = []

    // data.map(function(item, index) {
    //     dataset.push([
    //         [item.value, 100 - item.value],
    //         [item.name]
    //     ])
    // })

    // //设置布局
    // let clockwisePie = d3.layout.pie() //顺时针，针对数据类型:[small,bigger]
    // let anticlockwisePie = d3.layout.pie() //逆时针,针对数据类型：[bigger,small]
    //     .startAngle(0)
    //     .endAngle(-2 * Math.PI)

    // //设置弧生成器
    // //布局详见截图
    // let radius = 66

    // log(radius)

    // let arc = d3.svg.arc()
    //     .innerRadius(radius - 4)
    //     .outerRadius(radius);

    // //处理好结构
    // let ballUpdate = svg.selectAll('g.ball').data(dataset)
    // let ballEnter = ballUpdate.enter().append('g').attr('class', 'ball')
    // ballEnter.append('circle').attr('class', 'outLine')
    // ballEnter.append('circle').attr('class', 'innerCircle')
    // ballEnter.append('path').attr('class', 'outCircle')
    // ballEnter.append('text').attr('class', 'footText')
    // ballEnter.append('path').attr('class', 'areaWava')

    // ballUpdate.exit().remove()

    // let ballGroup = svg.selectAll('.ball').data(dataset)

    // let xScale = d3.scale.ordinal()
    //     .domain(d3.range(dataset.length))
    //     .rangeRoundBands([0, width], 0.2)

    // //绘制外圈灰色圆
    // let outLine = ballGroup.select('.outLine')
    //     .attr({
    //         'r': radius,
    //         'fill': 'none',
    //         'cx': (d, i) => {
    //             return xScale(i) + renderCfg.grid.left
    //         },
    //         'cy': height / 2,
    //         'stroke': '#9f9fb3',
    //         'stroke-width': 1,
    //         'stroke-opacity': .5
    //     })
    //     //绘制外圈渐变圆
    // let outCircle = ballGroup.select('.outCircle')
    //     .attr({
    //         'fill': 'url(#outCircle)',
    //         'd': (d, i) => {
    //             if (d[0][0] > d[0][1]) {
    //                 return arc(clockwisePie(d[0])[0])
    //             } else {
    //                 return arc(anticlockwisePie(d[0])[0])
    //             }
    //         },
    //         'transform': (d, i) => {
    //             let x = xScale(i) + renderCfg.grid.left
    //             return 'translate(' + x + ',' + height / 2 + ')'
    //         }
    //     })
    //     //绘制内部实心圆
    // let innerCircle = ballGroup.select('.innerCircle')
    //     .attr({
    //         'r': radius - 8,
    //         'fill': 'rgba(79,35,129,0.6)',
    //         'cx': (d, i) => {
    //             return xScale(i) + renderCfg.grid.left
    //         },
    //         'cy': height / 2
    //     })

    // //绘制底部名称
    // let footText = ballGroup.select('.footText')
    //     .attr({
    //         x: (d, i) => {
    //             return xScale(i) + renderCfg.grid.left
    //         },
    //         y: height / 2 + radius + 30,
    //         'fill': '#52b8ff',
    //         'text-anchor': 'middle',
    //         'font-size': 18
    //     })
    //     .text((d, i) => {
    //         return d[1][0]
    //     })

    //制作波浪纹
    let wavaData = [80,40,80]

    let wavaArea = d3.svg.area()
                    .x((d,i)=>{return 50 + i * 80})
                    .y0((d,i)=>{return 0})
                    .y1((d,i)=>{return height/2 - d})
                    .interpolate('basis')

    svg.append('path')
        .attr({
            'd':wavaArea(wavaData),
            'fill':'yellow'

        })



    



}