import * as d3 from 'd3'
import getSvg from '../tool/getSvg'

export default (data) => {
  const log = console.log.bind(console)
  log('start render bar-chart')
  const svg = getSvg()

  let width = parseInt(svg.style('width'), 10) - 100
  let height = parseInt(svg.style('height'), 10) - 100

  let xData = []

  data.map((item) => {
    xData.push(item.name)
  })

  //制作蒙版
  let isSpartLine = svg.select('.spart-line').empty()
  let spartLine
  if (isSpartLine) {
    spartLine = svg.select('#maskLine').append('g').attr('class', 'spart-line')
    for (let i = 0; i < 20; i++) {
      spartLine.append('line').attr({
        'x1': 0,
        'y1': i * 20,
        'x2': 900,
        'y2': i * 20
      })
    }
  }

  let xScale = d3.scale.ordinal()
    .domain(d3.range(data.length))
    .rangeRoundBands([50, width], 0.4)

  let yScale = d3.scale.linear()
    .domain([0, d3.max(data, d => {
      return d.value
    }) * 1.2])
    .range([50, height])

  let groupUpdate = svg.selectAll('.bar-item').data(data)
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
      'mask': 'url(#maskLine)',
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
  let barText = group.select('text')

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
    .rangeRoundBands([50, width], 0.4)

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