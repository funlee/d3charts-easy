import * as d3 from 'd3'
import getSvg from '../tool/getSvg'

export default (data) => {
  const log = console.log.bind(console)
  log('start render line-chart')
  const svg = getSvg()

  let width = parseInt(svg.style('width'), 10) - 100
  let height = parseInt(svg.style('height'), 10) - 100

  let colors = ['#d7b723', '#17f3d1', '#a455f4']

  //集合所有数据寻找最大value值
  let allData = []
  d3.range(3).map((d, i) => {
    allData.push(data['line' + (i + 1)])
  })

  let maxValue = allData[0][0].value

  allData.map((item, i) => {
    item.map((tip, index) => {
      maxValue = allData[i][index].value > maxValue ? allData[i][index].value : maxValue
    })
  })

  let xScale = d3.scale.linear()
    .domain([0, 12])
    .range([50, width])

  let yScale = d3.scale.linear()
    .domain([0, maxValue * 1.1])
    .range([50, height])

  let linePath = d3.svg.line()
    .x((d, i) => {
      return xScale(i)
    })
    .y(d => {
      return yScale(d.value)
    })
    .interpolate('basis')

  let lineUpdate = svg.selectAll('.line-path').data(allData)

  lineUpdate.enter().append('path').attr('class', 'line-path')
  lineUpdate.exit().remove()

  let line = svg.selectAll('.line-path')
    .classed('active-line', false)
    .data(allData)
    .attr({
      'd': (d, i) => {
        return linePath(d)
      },
      'fill': 'none',
      'stroke-width': 3,
      'stroke': (d, i) => {
        return colors[i]
      },
      'stroke-opacity': .6,
      'transform': ()=>{
        let trsX = xScale(1) - 50
        return 'translate(' + trsX + ',0)'
      },
      'stroke-opacity': 0
    })
    .transition()
    .delay(1000)
    .attr('stroke-opacity', 1)
    .attr('class', 'active-line line-path')

  //添加坐标轴

  //添加X轴
  let xAxisScale = d3.scale.ordinal()
    .domain(d3.range(13).map((d, i) => {
      return d == 0 ? d : d + '月'
    }))
    .rangePoints([50, width])

  let xAxis = d3.svg.axis()
    .scale(xAxisScale)
    .orient('bottom');

  let isXAxis = svg.select('.x-axis').empty()
  let xAxisG
  if (isXAxis) {
    xAxisG = svg.append('g').attr('class', 'x-axis axis')
  } else {
    xAxisG = svg.select('.x-axis')
  }

  xAxisG.attr('transform', 'translate(0,' + height + ')')
    .call(xAxis)

  //重新设置y轴比例尺的值域，与原来的相反
  yScale.range([height, 50]);

  let yAxis = d3.svg.axis()
    .scale(yScale)
    .orient('left')

  let isYAxis = svg.select('.y-axis').empty()
  let yAxisG
  if (isYAxis) {
    yAxisG = svg.append('g').attr('class', 'y-axis axis')
  } else {
    yAxisG = svg.select('.y-axis')
  }

  yAxisG.attr('transform', 'translate(50,0)')
    .call(yAxis)
}