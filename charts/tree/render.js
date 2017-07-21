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

    log('start render tree-chart')

    let renderCfg = getCfg(defaultCfg, userCfg)

    let svg = getSvg(element, renderCfg)

    let width = parseInt(svg.style('width'), 10) - renderCfg.grid.left - renderCfg.grid.right
    let height = parseInt(svg.style('height'), 10) - renderCfg.grid.top - renderCfg.grid.bottom

    var gTree = svg.append("g")
                        .attr("transform","translate(40,0)");
        
        var tree = d3.layout.tree()
            .size([width, height-200])
            .separation(function(a, b) { return (a.parent == b.parent ? 1 : 2) ; });

        var diagonal = d3.svg.diagonal()
            .projection(function(d) { return [d.y, d.x]; });
        
        d3.json("../../mockData/city.json", function(error, root) {

            var nodes = tree.nodes(root);
            var links = tree.links(nodes);
            
            console.log(nodes);
            console.log(links);
            
            var link = gTree.selectAll(".link")
              .data(links)
              .enter()
              .append("path")
              .attr("class", "link")
              .attr("d", diagonal); //使用对角线生成器
            
            var node = gTree.selectAll(".node")
                          .data(nodes)
                          .enter()
                          .append("g")
                          .attr("class", "node")
                          .attr("transform", function(d) { return "translate(" + d.y + "," + d.x + ")"; })
            
            node.append("circle")
                .attr("r", 4.5);
            
            node.append("text")
                  .attr("dx", function(d) { return d.children ? -8 : 8; })
                  .attr("dy", 3)
                  .style("text-anchor", function(d) { return d.children ? "end" : "start"; })
                  .text(function(d) { return d.name; });
        });

    
}