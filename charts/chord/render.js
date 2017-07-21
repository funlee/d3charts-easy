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

    log('start render chord-chart')

    let renderCfg = getCfg(defaultCfg, userCfg)

    let svg = getSvg(element, renderCfg)

    let width = parseInt(svg.style('width'), 10) - renderCfg.grid.left - renderCfg.grid.right
    let height = parseInt(svg.style('height'), 10) - renderCfg.grid.top - renderCfg.grid.bottom

    // log(data)

    //1.确定初始数据

    var continent = ["亚洲", "欧洲", "非洲", "美洲", "大洋洲"];

    // 各州人口的来源，如
    //             亚洲      美洲
    //  亚洲      9000        1000
    //  美洲      7000        500
    // 该矩阵表示：
    // 1.亚洲的人口：有9000是本地人，有1000人是来自美洲的移民，总人口为 9000 + 1000
    // 2.美洲的人口：有500是本地人，有7000人是来自亚洲的移民，总人口为 500 + 7000

    var population = [
        [9000, 870　, 3000　, 1000, 5200],
        [3400, 8000　, 2300　, 4922, 374],
        [2000, 2000　, 7700　, 4881, 1050],
        [3000, 8012, 5531, 500, 400],
        [3540, 4310　, 1500, 1900, 300]
    ];

    //2.转换数据
    var chord = d3.layout.chord()
        .padding(0.03)
        .sortSubgroups(d3.ascending)
        .matrix(population);

    console.log(chord.groups());
    console.log(chord.chords());


    //3.绘制

    //弦图的<g>元素
    var gChord = svg.append("g")
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    //节点的<g>元素
    var gOuter = gChord.append("g");

    //弦的<g>元素
    var gInner = gChord.append("g");

    //颜色比例尺
    var color20 = d3.scale.category20();

    //绘制节点
    var innerRadius = width / 3 * 0.7;
    var outerRadius = innerRadius * 1.1;

    //弧生成器
    var arcOuter = d3.svg.arc()
        .innerRadius(innerRadius)
        .outerRadius(outerRadius);

    gOuter.selectAll(".outerPath")
        .data(chord.groups())
        .enter()
        .append("path")
        .attr("class", "outerPath")
        .style("fill", function(d) {
            return color20(d.index);
        })
        .attr("d", arcOuter);

    gOuter.selectAll(".outerText")
        .data(chord.groups())
        .enter()
        .append("text")
        .each(function(d, i) {
            d.angle = (d.startAngle + d.endAngle) / 2;
            d.name = continent[i];
        })
        .attr("class", "outerText")
        .attr('fill','red')
        .attr("dy", ".35em")
        .attr("transform", function(d) {
            var result = "rotate(" + (d.angle * 180 / Math.PI) + ")";

            result += "translate(0," + -1.0 * (outerRadius + 10) + ")";

            if (d.angle > Math.PI * 3 / 4 && d.angle < Math.PI * 5 / 4)
                result += "rotate(180)";

            return result;
        })
        .text(function(d) {
            return d.name;
        });


    //绘制弦
    var arcInner = d3.svg.chord()
        .radius(innerRadius);

    gInner.selectAll(".innerPath")
        .data(chord.chords())
        .enter()
        .append("path")
        .attr("class", "innerPath")
        .attr("d", arcInner)
        .style("fill", function(d) {
            return color20(d.source.index);
        });


    gOuter.selectAll(".outerPath")
        .on("mouseover", fade(0.0)) //鼠标放到节点上
        .on("mouseout", fade(1.0)); //鼠标从节点上移开

    function fade(opacity) {
        //返回一个function(g, i)
        return function(g, i) {

            gInner.selectAll(".innerPath") //选择所有的弦
                .filter(function(d) { //过滤器
                    //没有连接到鼠标所在节点的弦才能通过
                    return d.source.index != i && d.target.index != i;
                })
                .transition() //过渡
                .style("opacity", opacity); //透明度
        }

    }



}