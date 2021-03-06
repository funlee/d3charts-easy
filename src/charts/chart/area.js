import * as d3 from 'd3'
import getSvg from '../tool/getSvg'

export default (data) => {
  const log = console.log.bind(console)
  log('start render area-chart')
  const svg = getSvg()

  let width = parseInt(svg.style('width'), 10) - 100
  let height = parseInt(svg.style('height'), 10) - 100

  let xScale = d3.scale.linear()
    .domain([0, 12])
    .range([50, width])

  let yScale = d3.scale.linear()
    .domain([0, d3.max(data, d => {
      return d.value
    }) * 1.1])
    .range([height, 50])

  let areaPath = d3.svg.area()
    .x((d, i) => {
      return xScale(i)
    })
    .y1((d, i) => {
      return yScale(d.value)
    })
    .y0(yScale(0))
    .interpolate('basis')

  let isArea = svg.select('.area-path').empty()
  let area

  if (isArea) {
    area = svg.append('path').attr('class', 'area-path')
  } else {
    area = svg.select('.area-path')
  }

  area.attr({
    'd': areaPath(data),
    'stroke': 'none',
    'transform': () => {
      let trsX = xScale(1) - 50
      return 'translate(' + trsX + ',0)'
    },
    'fill': 'url(#areaGradient)',
    'mask': 'url(#areaMask)'
  })

  //面积图顶部的折线
  let linePath = d3.svg.line()
    .x((d, i) => {
      return xScale(i)
    })
    .y(d => {
      return yScale(d.value)
    })
    .interpolate('basis')

  let isLine = svg.select('.area-line').empty()
  let line

  if (isLine) {
    line = svg.append('path').attr('class', 'area-line')
  } else {
    line = svg.select('.area-line')
  }

  line.classed('active-line', false)
    .data([data])
    .attr({
      'd': (d, i) => {
        return linePath(d)
      },
      'fill': 'none',
      'stroke-width': 3,
      'stroke': '#ef8b32',
      'stroke-opacity': .6,
      'transform': () => {
        let trsX = xScale(1) - 50
        return 'translate(' + trsX + ',0)'
      },
      'stroke-opacity': 0
    })
    .transition()
    .delay(500)
    .duration(3800)
    .attr('stroke-opacity', 1)
    .attr('class', 'active-line area-line')

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

  //面积动画--利用蒙版
  d3.select('#areaMask').select('rect')
    .attr({
      'width': xScale(1),
      'height': height,
      'x': -xScale(1) + 50
    })
    .transition()
    .delay(500)
    .duration(3800)
    .ease('bounce')
    .attr({
      'width': xScale(data.length)
    })

}