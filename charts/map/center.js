/**
 * @Author:       lee
 * @Email:        i@funlee.cn
 * @DateTime:     2017-07-07 16:12:24
 * @Description:  根据地图绘制数据获取绘图中心点
 * @Last Modified:2017-07-07 16:12:24
 */
export default (features) => {
    let longitudeMin = 100000;
    let latitudeMin = 100000;
    let longitudeMax = 0;
    let latitudeMax = 0;
    features.map((e) => {
        let a = d3.geo.bounds(e);
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
    });
    let c = (longitudeMax + longitudeMin) / 2;
    let d = (latitudeMax + latitudeMin) / 2;
    return [c, d];
}