import * as d3 from 'd3'
import getSvg from '../tool/getSvg'

export default (data) => {
  const log = console.log.bind(console)
  log('start render bar-chart')
  const svg = getSvg()

  let width = parseInt(svg.style('width'), 10) - 100
  let height = parseInt(svg.style('height'), 10) - 100

  let dataset1 = data.data1
  let dataset2 = data.data2

  let radius = width / 6;
  let outerCircleR = radius + 28
  let splitNum = 5 //绘制5个同心分隔圆
  let radiusScale = d3.scale.linear()
                      .domain([0,splitNum]) 
                      .range([0,radius])

  //雷达图 = 分隔区域（坐标轴） + 数据雷达

  //绘制分隔区域(坐标轴)
  let isSplit = svg.select('.split').empty()
  let split
  if(isSplit) {
      split = svg.append('g').attr({
          'class':'split',
          'transform':'translate('+width / 2+','+height / 2+')'
      })
      //绘制同心圆
      d3.range(splitNum).map(d=>{
          split.append('circle').attr({
              'r':radiusScale(d + 1),
              'fill':'none',
              'stroke':'#00a0e9',
              'stroke-width':2
          })
      })

  } else {
      split = svg.select('.split')
  }

  //取得绘制雷达区域的坐标点
  let splitPie = d3.layout.pie()
                  .value(d=>{return 1}) //写个固定值，平分
                  .sort(null)

  let splitPieData1 = splitPie(dataset1) //利用数据的个数确定分割的份数
  let splitPieData2 = splitPie(dataset2)

  let splitArc = d3.svg.arc()
      .innerRadius(0)
      .outerRadius(radius)

  //绘制分隔线：饼图镂空 + 蒙版裁剪
  //添加一个裁剪
  let isClipPath = svg.select('#clipCircle').empty()
  if(isClipPath) {
      svg.append('defs').append('clipPath').attr({'id':'clipCircle'}).append('circle').attr({
          'r':outerCircleR - 4,
          'fill':'white'
      })
  }

  let isSplitLine = svg.select('.split-line').empty()
  let splitLine
  if(isSplitLine) {
      splitLine = svg.append('g').attr({
          'class':'split-line',
          'transform':'translate(' + width / 2 + ',' + height / 2 + ')',
          'clip-path':'url(#clipCircle)'
      })
  } else {
      splitLine = svg.select('.split-line')
  }

  let splitLineUpdate = splitLine.selectAll('path').data(splitPieData1)
  splitLineUpdate.enter().append('path')
  splitLineUpdate.exit().remove()

  
  let splitLineArc = d3.svg.arc()
      .innerRadius(0)
      .outerRadius(outerCircleR)

  //镂空饼图
  splitLine.selectAll('path').data(splitPieData1).attr({
      'd':d=>{return splitLineArc(d)},
      'fill':'none',
      'stroke':'#00a0e9',
      'stroke-dasharray':'6',
      'stroke-width':2
  })
  //绘制文本
  //考虑到文本需要旋转，就不放在splitLine里面了
  let isSplitText = svg.select('.split-text').empty()
  let splitText
  if(isSplitText) {
      splitText = svg.append('g').attr({
          'class':'split-text',
          'transform':'translate(' + width / 2 + ',' + height / 2 + ')' + 
          ' rotate('+360 / (data.data1.length * 2)+')'
      })
  } else {
      splitText = svg.select('.split-text')
  }

  let splitTextUpdate = splitText.selectAll('text').data(splitPieData1)
  splitTextUpdate.enter().append('text')
  splitTextUpdate.exit().remove()


  //添加文本
  let textArr = ['AD攻击','AD防御','AP攻击','AP防御','上手难度']
  splitText.selectAll('text').data(splitPieData1).attr({
      'transform':d=>{
          let x = splitLineArc.centroid(d)[0] * 2.1
          let y = splitLineArc.centroid(d)[1] * 2.1
          return 'translate('+x+','+y+')' + ' rotate('+ -360 / (data.data1.length * 2)+')'
      },
      'font-size':12,
      'fill':'#5e98cd',
      'text-anchor':'middle'
  })
  .text((d,i)=>{return textArr[i]})
  
  //获取的坐标点，绘制雷达区域
  let maxValue1 = d3.max(dataset1,d=>{return d.value})
  let maxValue2 = d3.max(dataset2,d=>{return d.value})
  let maxValue = maxValue1 - maxValue2 > 0 ? maxValue1 : maxValue2

  let radarAreaPath1 = ''
  let radarAreaPath2 = ''

  let radarScale = d3.scale.linear()
                  .domain([0,maxValue * 1.2]) //适当放大，不让任何坐标点抵达圆周边缘
                  .range([0,2]) 

  splitPieData1.map((coord,i)=>{
      let scale = radarScale(dataset1[i].value)
      if(i == 0) {
          radarAreaPath1+='M' + splitArc.centroid(coord)[0] * scale + ',' + splitArc.centroid(coord)[1] * scale
      } else {
          radarAreaPath1+='L' + splitArc.centroid(coord)[0] * scale + ',' + splitArc.centroid(coord)[1] * scale
      }
  })

  splitPieData2.map((coord,i)=>{
      let scale = radarScale(dataset2[i].value)
      if(i == 0) {
          radarAreaPath2+='M' + splitArc.centroid(coord)[0] * scale + ',' + splitArc.centroid(coord)[1] * scale
      } else {
          radarAreaPath2+='L' + splitArc.centroid(coord)[0] * scale + ',' + splitArc.centroid(coord)[1] * scale
      }
  })

  let isRadarArea = svg.select('.radar-area').empty()
  let radarArea

  if(isRadarArea) {
      radarArea = svg.append('g').attr({
          'class':'radar-area',
          'transform':'translate('+width / 2+','+height / 2+')' +
                      ' rotate('+360 / (data.data1.length * 2)+')'
      })
      radarArea.append('path').attr({
          'class':'radar-area1'
      })
      radarArea.append('path').attr({
          'class':'radar-area2'
      })
  } else {
      radarArea = svg.select('.radar-area')
  }

  radarArea.select('.radar-area1').attr({
      'd':radarAreaPath1 + 'Z',//闭合路径
      'stroke-width':2,
      'fill':'rgba(0,160,233,0.3)',
      'stroke':'#00ffff' 
  })
  radarArea.select('.radar-area2').attr({
      'd':radarAreaPath2 + 'Z',//闭合路径
      'stroke-width':2,
      'fill':'rgba(211,25,228,0.3)',
      'stroke':'#d319e4' 
  })
}