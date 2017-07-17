/**
 * @Author:       lee
 * @Email:        i@funlee.cn
 * @DateTime:     2017-07-07 16:18:26
 * @Description:  根据绘图配置项（用户配置项和默认配置项合并之后）的width、height和父级容器（当传值为百分比时）确定绘图画布的大小(Number值)；
 *                即获取{width:widthValue,height:heightValue}
 *                确定画布大小，宽高均为Number值：
 *                1.配置项没传宽高，就取默认配置项，默认为100%
 *                2.需要对配置项为数字还是百分比分别处理
 *                3.如果为数字，则画布大小（宽高）值为：配置项值 - 相应的grid值
 *                4.如果为百分比，则应先取其容器即：element的宽高，再根据百分比进行计算，避免浮点数，对结果进行了向下取整
 *                5.判断是否是百分比：将配置项值转换为字符串，在切割成数组，取数组最后一项看是否为 ‘%’
 * @Last Modified:2017-07-07 16:18:26
 */

export default (element,renderCfg) => {
    let w,h,size;

    let widthStr = renderCfg.width.toString()
    let heightStr = renderCfg.height.toString()

    let widthArr = widthStr.split('')
    let heightArr = heightStr.split('')

    let isWPercent = widthArr[widthArr.length - 1]
    let isHPercent = heightArr[heightArr.length - 1]

    if(isWPercent == '%') {
        w = Math.floor(parseInt(d3.select(element).style('width'), 10) * parseInt(widthStr, 10) / 100)
    } else {
        w = parseInt(renderCfg.width,10) //parseInt(renderCfg.width,10)可以避免传递的值单位是 px
    }
    if(isHPercent == '%') {
        h = Math.floor(parseInt(d3.select(element).style('height'), 10) * parseInt(heightStr, 10) / 100)
    } else {
        h = parseInt(renderCfg.height,10)
    }
    size = {
        width:w,
        height:h
    }
    return size
}


