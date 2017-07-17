/**
 * @Author:       lee
 * @Email:        i@funlee.cn
 * @DateTime:     2017-07-16 00:16:42
 * @Description:  Description
 * @Last Modified:2017-07-16 00:16:42
 */
import * as topojson from 'topojson'

import getCfg from '../common/config'
import getSvg from '../common/svg'

import defaultCfg from './config'
import getScale from './scale'
import getCenter from './center'

export default (element,userCfg={}) => {

    const log = console.log.bind(console)

    log('start render map-chart')

    let renderCfg = getCfg(defaultCfg,userCfg)
    let svg = getSvg(element,renderCfg)

    let width = parseInt(svg.style('width'),10) - renderCfg.grid.left - renderCfg.grid.right

    let height = parseInt(svg.style('height'),10) - renderCfg.grid.top - renderCfg.grid.bottom

    let jsonSrc = '../charts/json/chongqingtopo.json'

    d3.json(jsonSrc, function(error, root) {
        if(error){
            return console.error(error);
        }

        let georoot = topojson.feature(root,root.objects.chongqing)
        let rootData = georoot.features

         /**
         *  计算地图缩放的大小和中心点
         *  然后确定投影
         */
        
        let scale = getScale(rootData, width, height);
        let center = getCenter(rootData);

        let projection = d3.geo.mercator()
                .scale(scale * 48)
                .center(center)
                .translate([width / 2, height / 2]);

        let path = d3.geo.path()
            .projection(projection);


        //绘制地图 -- 阴影部分
        let isMapGroupShad = svg.select('.group-shad').empty()
        let mapGroupShad
        if(isMapGroupShad) {
            mapGroupShad = svg.append('g').attr('class','group-shad')
        } else {
            mapGroupShad = svg.select('.group-shad')
        }
        mapGroupShad.selectAll('path')
                .data(rootData)
                .enter()
                .append('path')
                .attr({
                    'stroke':'#0232ac',
                    'stroke-width':4,
                    'fill':'none',
                    'd':path,
                    'transform': 'translate(2,0)'
                })


        //绘制地图 -- 主要部分
        let isMapGroup = svg.select('.group').empty()
        let mapGroup
        if(isMapGroup) {
            mapGroup = svg.append('g').attr('class','group')
        } else {
            mapGroup = svg.select('.group')
        }
        mapGroup.selectAll('path')
                .data(rootData)
                .enter()
                .append('path')
                .attr({
                    'stroke':'#0947d4',
                    'stroke-width':1,
                    'fill':'#090b0e',
                    d:path,
                    'cursor':'pointer'
                })
                .on("mouseover", function(d, i) {
                    d3.select(this)
                        .attr("fill", '#0232ac');
                })
                .on("mouseout", function(d, i) {
                    d3.select(this)
                        .attr("fill", '#090b0e');
                });
    })
}



        
