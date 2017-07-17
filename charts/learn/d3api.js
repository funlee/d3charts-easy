import d3 from 'd3'
export default ()=> {
    const log = console.log.bind(console)
    log('d3api')
    let svg = d3.select('.test').append('svg').attr({'width':500,'height':500})

    // let circles = [{cx:150,cy:200,r:30},{cx:250,cy:200,r:30}]

    // let ss = svg.selectAll('circle')
    //     .data(circles)
    //     .enter()
    //     .append('circle')
    //     .attr({
    //         'cx':function(d){return d.cx},
    //         'cy':function(d,i) {return d.cy},
    //         'r':function(d) {return d.r},
    //         'fill':'red'
    //     })
    //     .call(drag)

    //拖拽
    // let drag = d3.behavior.drag()
    //             .origin(function(d,i) {
    //                 return {x:d.cx,y:d.cy}
    //             })
    //             .on('dragstart',function(d){log('start')})
    //             .on('dragend',function(d){log('end')})
    //             .on('drag',function(d) {
    //                 d3.select(this).attr({
    //                     'cx':d.cx = d3.event.x,
    //                     'cy':d.cy = d3.event.y
    //                 })
    //             })


    //缩放

    // let g = svg.append('g')
    //         .call(zoom)

    //     g.selectAll('circle')
    //         data(circles)
    //         .enter()
    //         .append('circle')
    //         .attr({
    //             'cx':function(d){return d.cx},
    //             'cy':function(d,i) {return d.cy},
    //             'r':function(d) {return d.r},
    //             'fill':'red'
    //         })

    // let zoom = d3.behavior.zomm()
    //             .scaleExtent([1,10])
    //             .on('zoom',function(d) {
    //                 d3.select(this).attr({
    //                     'transform':'translate('+d3.event.translate+')' + 'scale('+d3.event.scale+')'
    //                 })
    //             })

    //线段生成器
    // {
    //     var lines = [20,100,120,180,260]
    //     var linePath = d3.svg.line()
    //                 .x(function(d){
    //                     return d
    //                 })
    //                 .y(function(d,i) {
    //                     return i % 2 == 0?40:120
    //                 })
    //                 .interpolate('basis')
    
    //     var linePath2 = d3.svg.line()
    //             .x(function(d){
    //                 return d
    //             })
    //             .y(function(d,i) {
    //                 return i % 2 == 0?40:120
    //             })
    //             // .interpolate('step')
    
    //     svg.append('path')
    //         .attr({
    //             'd':linePath(lines),
    //             'stroke':'red',
    //             'fill':'none',
    //             'stroke-width':'3px'
    //         })
    //     svg.append('path')
    //         .attr({
    //             'd':linePath2(lines),
    //             'stroke':'green',
    //             'fill':'none',
    //             'stroke-width':'3px'
    //         })
    // }
    //区域生成器
    var dataset = [80,120,130,70,60,90]
    var areaPath = d3.svg.area()
                    .x(function(d,i) {
                        return 50 + i * 80
                    })
                    .y0(function(d,i) {
                        return 250
                    })
                    .y1(function(d,i) {
                        return 250 - d
                    })

    svg.append('path')
        .attr({
            'd':areaPath(dataset),
            'stroke':'red',
            'stroke-width':'3px',
            'fill':'yellow'

        })

}