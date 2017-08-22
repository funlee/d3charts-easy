import * as d3 from 'd3'
import getSvg from '../tool/getSvg'

export default (data) => {
  const log = console.log.bind(console)
  log('start render pie-chart')
  const svg = getSvg()

  let width = parseInt(svg.style('width'), 10) - 100
  let height = parseInt(svg.style('height'), 10) - 100

  //创建一个g元素包裹所有的扇形
  let isArcWrap = svg.select('.arcWrap').empty()
  let arcWrap
  if (isArcWrap) {
    arcWrap = svg.append('g').attr('class', 'arcWrap')
  } else {
    arcWrap = svg.select('.arcWrap')
  }

  arcWrap.attr('mask', '').style('visibility', 'hidden')

  svg.classed('ready', false)

  let pie = d3.layout.pie()
    .value(function(d) {
      return d.value
    })
    .sort(null)
    //处理数据
  let pieData = pie(data);

  //弧生成器
  let outerRadius = width / 6;
  let innerRadius = 0;

  let arc = d3.svg.arc()
    .innerRadius(innerRadius)
    .outerRadius(outerRadius);

  let arcsUpdate = arcWrap.selectAll('.arcs').data(pieData)
  let arcsEnter = arcsUpdate.enter().append('g').attr('class', 'arcs')

  arcsEnter.append('path').attr('class', 'arcs-path') //把PATH 加上
  arcsEnter.append('text').attr('class', 'arcs-value') //把Value值的text 加上
  arcsEnter.append('path').attr('class', 'arcs-line')

  arcsUpdate.exit().remove()

  let arcs = arcWrap.selectAll('.arcs').attr('transform', 'translate(' + (width / 2) + ',' + (height / 2) + ')')

  //填充颜色值组
  // let colors = ['#36add0', '#ddc83a', '#8219be', '#2ce996', '#f6e675', '#ef2d8d', '#093544']

  let arcsPath = arcs.select('.arcs-path')
    .attr({
      'fill': 'url(#fill-img)',
      'd': d => {
        return arc(d)
      },
      'cursor': 'pointer',
      'stroke': '#235894',
      'stroke-width': 3
    })
    .on('mousemove', function(d, i) {
      d3.select(this).attr({
        'transform': 'scale(1.1,1.1)'
      })
      let tooltip = d3.select('.tooltip')
        .style({
          'display': 'block',
          'top': d3.event.pageY + 10 + 'px',
          'left': d3.event.pageX + 10 + 'px'
        })
      tooltip.select('.name').html(d.data.name + ':')
      tooltip.select('.value').html(d.data.value)

      tooltip.select('.rate').html((Number(d.value) / d3.sum(data, item => {
        return item.value
      }) * 100).toFixed(1) + '%')
    })
    .on('mouseout', function() {
      d3.select(this).attr({
        'transform': 'scale(1,1)'
      })
      d3.select('.tooltip').style('display', 'none')
    })

  //名称展示斜线长度基数
  let solid = 2.4 //需要大于2<-->2π
    //名称展示水平线长度
  let standard = 10
    //名称与水平线间距
  let spart = 5

  //name值展示
  let arcsText = arcs.select('.arcs-value')
    .attr({
      'transform': d => {
        let x
        let y = arc.centroid(d)[1] * solid
        if (parseFloat(d.endAngle.toFixed(2)) <= parseFloat(Math.PI.toFixed(2))) {
          x = arc.centroid(d)[0] * solid + standard + spart
        } else {
          x = arc.centroid(d)[0] * solid - standard - spart
        }
        return 'translate(' + x + ',' + y + ')'
      },
      'text-anchor': d => {
        if (parseFloat((d.startAngle + ((d.endAngle - d.startAngle) / 2)).toFixed(2)) <= parseFloat(Math.PI.toFixed(2))) { //判断扇形中线所在的弧度是否超过半圆
          return 'start'
        } else {
          return 'end'
        }
      },
      'dy': '.5em',
      'fill': '#235894'
    })
    .text(d => {
      return d.data.name
    })
    //画名称展示线
  let arcsLine = arcs.select('.arcs-line')
    .attr({
      'd': d => {
        let p1x = arc.centroid(d)[0] * 2
        let p1y = arc.centroid(d)[1] * 2

        let p2x = arc.centroid(d)[0] * solid
        let p2y = arc.centroid(d)[1] * solid

        let p3x
          // let p3y = p2y

        if (parseFloat((d.startAngle + ((d.endAngle - d.startAngle) / 2)).toFixed(2)) <= parseFloat(Math.PI.toFixed(2))) { //判断扇形中线所在的弧度是否超过半圆
          p3x = p2x + standard
        } else {
          p3x = p2x - standard
        }
        return 'M ' + p1x + ' ' + p1y + 'L ' + p2x + ' ' + p2y + 'L ' + p3x + ' ' + p2y
      },
      'stroke': '#235894',
      'fill': 'none',
      'stroke-width': 2
    })

  //添加蒙版动画
  setTimeout(function() {
    arcWrap.attr('mask', 'url(#mask)').style('visibility', 'visible')
    svg.classed('ready', true)
  }, 1000)


}