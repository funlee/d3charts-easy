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

    log('start render force-chart')

    let renderCfg = getCfg(defaultCfg, userCfg)

    let svg = getSvg(element, renderCfg)

    let width = parseInt(svg.style('width'), 10) - renderCfg.grid.left - renderCfg.grid.right
    let height = parseInt(svg.style('height'), 10) - renderCfg.grid.top - renderCfg.grid.bottom

    log(data)

    var nodes = [
        {name:'Jay'},
        {name:'范特西'},
        {name:'八度空间'},
        {name:'叶惠美'},
        {name:'七里香'},
        {name:'11月的萧邦'},
        {name:'依然范特西'},
        {name:'我很忙'},
        {name:'魔杰座'},
        {name:'跨时代'},
        {name:'惊叹号'},
        {name:'12新作'},
        {name:'哎呦，不错哦'},
        {name:'周杰伦的床边故事'}
    ]

    var edges = [
        {source:0,target:1},
        {source:0,target:2},
        {source:0,target:3},
        {source:0,target:4},
        {source:0,target:5},
        {source:0,target:6},
        {source:0,target:7},
        {source:0,target:8},
        {source:0,target:9},
        {source:0,target:10},
        {source:0,target:11},
        {source:0,target:12},
        {source:0,target:13}
    ]

    var force = d3.layout.force()
                .nodes(nodes) //设定节点数组
                .links(edges) //设定连线数组
                .size([width,height]) //设定作用范围
                .linkDistance(200) //设定连线的距离
                .charge(-800)//设定节点排斥还是吸引,默认值是-30,正值吸引负值排斥
                .friction(0.9)//摩擦系数[0,1],默认0.9


    force.start() //开启布局计算

    // log(nodes)
    // log(edges)

    //绘制连线
    let forceLineUpdate = svg.selectAll('.forceLine')
                        .data(edges)
        forceLineUpdate.enter().append('line').attr('class','forceLine')
        forceLineUpdate.exit().remove()


    let lines = svg.selectAll('.forceLine')
                    .data(edges)
                    .attr({
                        'fill':'none',
                        'stroke':'#1779f4'
                    })
                    .style({
                        'stroke-dasharray':'4,2',
                        'stroke-width':2
                    })

    //绘制节点
    let forceCircleUpdate = svg.selectAll('.forceCircle')
                        .data(nodes)
        forceCircleUpdate.enter().append('circle').attr('class','forceCircle')
        forceCircleUpdate.exit().remove()

    var circles = svg.selectAll('.forceCircle')
                .data(nodes)
                .attr({
                    'r':(d,i)=>{
                        if(i == 0) {
                            return 20
                        } else {
                            return 10
                        }
                    },
                    'fixed':true
                })
                .style({
                    'fill':(d,i)=>{
                        if(i == 0) {
                            return 'rgb(255,255,255)'
                        } else {
                            return 'rgb(0,233,255)'
                        }
                    },
                    'stroke':'black',
                    'stroke-width':2,
                    'cursor':'pointer'
                })
                .call(force.drag)
                .on('mousemove',function(d,i) {
                    let tooltip = d3.select('.tooltip')
                        .style({
                            'display':'block',
                            'top':d3.event.pageY + 10 +'px',
                            'left':d3.event.pageX + 10+ 'px'
                        })
                        tooltip.select('.show-text').html(d.name)
                })
                .on('mouseout',function() {
                    d3.select('.tooltip').style('display','none')
                })
                .on('click',function() {

                    log(56)
                    
                })


    //绘制中心文字 -- 只展示一个额
    let isForceText = svg.selectAll('.forceText').empty()
    let forceText
    if(isForceText) {
        forceText = svg.append('text').attr('class','forceText')
    } else {
        forceText = svg.select('.forceText')
    }

    forceText.attr({
        'x':nodes[0].x,
        'y':nodes[0].y,
        'dy':4,
        'dx':-10
    })
    .style({
        'pointer-events':'none'
    })
    .text(nodes[0].name)

    //tick事件监听
    force.on('tick',function() {
        //更新连线的端点坐标
        lines.attr({
            'x1':d=>{return d.source.x},
            'y1':d=>{return d.source.y},
            'x2':d=>{return d.target.x},
            'y2':d=>{return d.target.y}
        })
        //更新节点坐标
        circles.attr({
            'cx':d=>{return d.x},
            'cy':d=>{return d.y}
        })
        //更新节点文字坐标
        forceText.attr({
            'x':nodes[0].x,
            'y':nodes[0].y
        })
    })

    //力学图运动开始
    force.on('start',()=>{
        log('运动开始')
    })

    //力学图运动结束
    force.on('end',()=>{
        log('运动结束')
    })

    var drag = force.drag()
                // .on('dragstart',d=>{d.fixed = true}) //拖拽开始后设定被拖拽对象为固定
                .on('dragend',function(d,i){d3.select(this).style('fill','rgb(0,233,255)')}) //拖拽结束后变为原来的颜色
                .on('drag',function(d){d3.select(this).style('fill','yellow')})



}