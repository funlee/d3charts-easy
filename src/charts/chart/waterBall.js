import * as d3 from 'd3'
import getSvg from '../tool/getSvg'

export default (data) => {
  const log = console.log.bind(console)
  log('start render waterBall-chart')
  const svg = getSvg()

  let width = parseInt(svg.style('width'), 10) - 100
  let height = parseInt(svg.style('height'), 10) - 100

  let dataset = []

  data.map(function(item, index) {
    dataset.push([
      [item.value, 100 - item.value],
      [item.name]
    ])
  })

  //设置布局
  let clockwisePie = d3.layout.pie() //顺时针，针对数据类型:[small,bigger]
  let anticlockwisePie = d3.layout.pie() //逆时针,针对数据类型：[bigger,small]
    .startAngle(0)
    .endAngle(-2 * Math.PI)

  //设置弧生成器
  //布局详见截图
  let radius = 66

  let arc = d3.svg.arc()
    .innerRadius(radius - 4)
    .outerRadius(radius);

  let xScale = d3.scale.ordinal()
    .domain(d3.range(dataset.length))
    .rangeRoundBands([0, width], 0.2)

  //处理好结构
  let ballUpdate = svg.selectAll('g.ball')
    .data(dataset)

  let ballEnter = ballUpdate.enter().append('g').attr('class', 'ball')
  ballUpdate.exit().remove()

  let ballGroup = svg.selectAll('.ball').data(dataset)
    .attr({
      'transform': (d, i) => {
        let x = xScale(i) + 100
        return 'translate(' + x + ',' + height / 2 + ')'
      }
    })

  //绘制外圈灰色圆
  ballEnter.append('circle').attr('class', 'outLine')
  let outLine = ballGroup.select('.outLine')
    .attr({
      'r': radius,
      'fill': 'none',
      'stroke': '#9f9fb3',
      'stroke-width': 1,
      'stroke-opacity': .5
    })

  //绘制外圈渐变圆
  ballEnter.append('path').attr('class', 'outCircle')
  let outCircle = ballGroup.select('.outCircle')
    .attr({
      'fill': 'url(#outerColor)',
      'd': (d, i) => {
        if (d[0][0] > d[0][1]) {
          return arc(clockwisePie(d[0])[0])
        } else {
          return arc(anticlockwisePie(d[0])[0])
        }
      }
    })

  //绘制内部实心圆
  ballEnter.append('circle').attr('class', 'innerCircle')
  let innerCircle = ballGroup.select('.innerCircle')
    .attr({
      'r': radius - 8,
      'fill': 'rgba(79,35,129,0.6)'
    })

  //绘制底部名称
  ballEnter.append('text').attr('class', 'footText')
  let footText = ballGroup.select('.footText')
    .attr({
      y: radius + 30,
      'fill': '#52b8ff',
      'text-anchor': 'middle',
      'font-size': 18
    })
    .text((d, i) => {
      return d[1][0]
    })


  //绘制100%的实心圆
  ballEnter.append('circle').attr('class', 'fillCircle')
  let fillCircle = ballGroup.select('.fillCircle')
    .attr({
      'r': radius - 8,
      'fill': 'url(#outerColor)',
      'clip-path': (d, i) => {
        return 'url(#areaWava' + i + ')'
      }
    })


  //制作波浪纹 - clipPath
  let isDefs = svg.select('defs').empty()
  let defs
  if (isDefs) {
    defs = svg.append('defs')
  } else {
    defs = svg.select('defs')
  }
  let clipPathUpdate = defs.selectAll('clipPath').data(data)
  clipPathUpdate.enter().append('clipPath').append('path')
  clipPathUpdate.exit().remove()

  let waveClipCount = 2
  let waveClipWidth = radius * 4
  let waveHeight = 10.26
  let waveOffset = 0;
  let waveCount = 1

  let wavaData = [];
  for (let i = 0; i <= 40 * waveClipCount; i++) {
    wavaData.push({
      x: i / (40 * waveClipCount),
      y: (i / (40))
    });
  }

  let waveScaleX = d3.scale.linear().range([0, waveClipWidth]).domain([0, 1]);
  let waveScaleY = d3.scale.linear().range([0, waveHeight]).domain([0, 1]);

  // translateY为radius 对应 0%
  // translateY为-radius 对应 100%
  let wavePercentScale = d3.scale.linear()
    .domain([0, 100])
    .range([radius, -radius])

  let clipArea = d3.svg.area()
    .x(function(d) {
      return waveScaleX(d.x);
    })
    .y0(function(d) {
      return waveScaleY(Math.sin(Math.PI * 2 * waveOffset * -1 + Math.PI * 2 * (1 - waveCount) + d.y * 2 * Math.PI));
    })
    .y1(function(d) {
      return 2 * radius
    });

  let clipPath = defs.selectAll('clipPath').attr({
      'id': (d, i) => {
        return 'areaWava' + i
      }
    })
    .select('path')
    .datum(wavaData)
    .attr({
      'd': clipArea,
      'fill': 'yellow',
      'T': 0
    })

  clipPath.transition()
    .duration(2000)
    .attr({
      'transform': (d, i) => {
        return 'translate(' + -3 * radius + ',' + wavePercentScale(data[i].value) + ')'
      }
    })
    .each('start', function() {
      clipPath.attr({
        'transform': (d, i) => {
          return 'translate(' + -3 * radius + ',' + radius + ')'
        }
      })
    })


  //绘制百分占比数值 -- 严格的绘制顺序决定层级
  ballEnter.append('text').attr('class', 'valueText')
  let valueText = ballGroup.select('.valueText')
    .attr({
      // y: 0,
      'fill': '#fff',
      'text-anchor': 'middle',
      'font-size': 38
    })
    .text(0)

  //value值加载动画
  let inittx = valueText.text()
  let valueTextTran = valueText.transition()
    .duration(2000)
    .tween('text', function(d, i) {
      return function(t) {
        d3.select(this).text(Math.floor(Number(inittx) + t * d[0][0]))
      }
    })
    //绘制value值百分比符号
  ballEnter.append('text').attr('class', 'percentText')
  let percentText = ballGroup.select('.percentText')
    .attr({
      y: -14,
      x: 34,
      'fill': '#fff',
      'text-anchor': 'middle',
      'font-size': 20
    })
    .text('%')

  //用定时器做波浪动画
  setTimeout(function() {
    let distance = -3 * radius
    d3.timer(waveTimer)

    function waveTimer() {
      distance++
      if (distance > -radius) {
        distance = -3 * radius
      }
      clipPath.attr({
        'transform': (d, i) => {
          return 'translate(' + distance + ',' + wavePercentScale(data[i].value) + ')'
        }
      })
    }
  }, 2000)
}