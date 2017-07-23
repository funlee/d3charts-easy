/**
 * @Author:       lee
 * @Email:        i@funlee.cn
 * @DateTime:     2017-07-23 23:49:21
 * @Description:  Description
 */
var echarts = require('echarts');

export default (element, userCfg, data) => {
    const log = console.log.bind(console)
    log('start render earth-chart')

    let myChart = echarts.init(document.getElementById('chart'));
    myChart.setOption({
        globe: {
            globeRadius:60,
            backgroundColor: 'rgba(0,0,0,0)',
            baseTexture: '../../images/baseTexture.jpg',
            heightTexture: '../../images/highTexture.jpg',
            displacementScale: 0.02,
            shading: 'realistic',
            // environment: '../image/zhda/environment.jpg',
            realisticMaterial: {
                roughness: 0.9
            },
            postEffect: {
                enable: true
            },
            light: {
                // main: {
                //     // intensity: 2,
                //     shadow: true
                // },
                ambient:{
                    color:'#fff',
                    intensity: 1,
                },
                ambientCubemap: {
                    // texture: '../image/zhda/texture2.hdr',
                    diffuseIntensity: 0.2
                }
            }
        }
    })
}