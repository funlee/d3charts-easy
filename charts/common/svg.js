/**
 * @Author:       lee
 * @Email:        i@funlee.cn
 * @DateTime:     2017-07-07 16:35:59
 * @Description:  根据绘图容器添加svg标签、设置svg大小最后返回svg对象
 * @Last Modified:2017-07-07 16:35:59
 */
export default (element,config) => {
    let svg
    let stage = d3.select(element)

    let width = config.width
    let height = config.height

    let grid = config.grid

    let top = grid.top
    let bottom = grid.bottom
    let left = grid.left
    let right = grid.right

    let isSvg = stage.select('svg').empty()
    
    if(isSvg) {
        svg = stage.append('svg')
    } else {
        svg = stage.select('svg')
    }
    svg.style({
        'width':width,
        'height':height,
        'padding':top + 'px ' + right + 'px ' + bottom + 'px ' + left + 'px',
        'box-sizing':'border-box'
    })
    return svg
}