/**
 * @Author:       lee
 * @Email:        i@funlee.cn
 * @DateTime:     2017-08-02 17:36:08
 */
import defaultCfg from './config'

import getCfg from '../common/config'
import getSvg from '../common/svg'

export default (element, userCfg, data) => {
    const log = console.log.bind(console)

    log('start render shapeBar-chart')

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
        .range([0, height - 40])

    //利用区域生成器绘制异形图形的path
    var area = d3.svg.area()
                .x(function(d) { return d.x; })
                .y0(function(d) { return height - d.y0; })
                .y1(function(d) { return height - d.y1; });

    let groupUpdate = svg.selectAll('.bar-item').data(dataset)
    let groupEnter = groupUpdate.enter().append('g').attr('class', 'bar-item')

    groupEnter.append('path')
    groupEnter.append('text')
    groupUpdate.exit().remove()

    let group = svg.selectAll('.bar-item')

    //value值显示动画
    group.on('mouseover', function() { //不能用箭头函数
            d3.select(this).select('text')
                .transition()
                .duration(1000)
                .attr({
                    'dy': '-2em',
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

    //绘制异形柱子
    let barPath = group.select('path')
    barPath.attr({
        //初始状态一:一条折线
        // 'd':(d,i)=>{
        //     let data = [
        //         {x:0, y0:20, y1:20},
        //         {x:38,y0:40, y1:40},
        //         {x:76,y0:20, y1:20}
        //     ]
        //     return area(data)
        //     //其实初始状态就是：M0,380L38,360L76,380L76,380L38,360L0,380Z
        // },
        //初始状态一 坐标生成的路径如下
        // 'd':'M0,380 L38,360 L76,380 L76,380 L38,360 L0,380Z',
        //初始状态二：矩形
        'd':(d,i) => {
            let data = [
                {x:0,y0:20,y1:40},
                {x:38,y0:20,y1:40},
                {x:76,y0:20,y1:40}
            ]
            return area(data)
        },
        'transform':(d,i)=>{
            return 'translate('+xScale(i)+',0)'
        },
        'fill':'#5234a3'
    })
    .transition()
    .delay(500)
    .duration(3000)
    .attr({
        'd':(d,i)=>{
            let pathY = yScale(d.value)
            let data = [
                {x:0, y0:20, y1:pathY},
                {x:38,y0:40, y1:pathY+20},
                {x:76,y0:20, y1:pathY}
            ]
            return area(data)
        }
    })

    //绘制Value值 -- 机智的解决方案
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

}
