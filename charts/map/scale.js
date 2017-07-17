/**
 * @Author:       lee
 * @Email:        i@funlee.cn
 * @DateTime:     2017-07-07 16:04:40
 * @Description:  根据地图绘制数据和画布大小，获取地图绘制缩放比例
 * @Last Modified:2017-07-07 16:04:40
 */

export default (features, width, height) => {
    let longitudeMin = 100000 //最小经度
    let latitudeMin = 100000 //最小维度
    let longitudeMax = 0 //最大经度
    let latitudeMax = 0 //最大纬度

    features.map((e) => {
        let a = d3.geo.bounds(e); //[[最小经度，最小维度][最大经度，最大纬度]]
        if (a[0][0] < longitudeMin) {
            longitudeMin = a[0][0];
        }
        if (a[0][1] < latitudeMin) {
            latitudeMin = a[0][1];
        }
        if (a[1][0] > longitudeMax) {
            longitudeMax = a[1][0];
        }
        if (a[1][1] > latitudeMax) {
            latitudeMax = a[1][1];
        }
    })

    let c = longitudeMax - longitudeMin;
    let d = latitudeMax - latitudeMin;
    /*if(a > b) {//按照宽度进行缩放
      return width/a;
    } else {
      return height/b;
    }*/
    return Math.min(width / c, height / d)
}