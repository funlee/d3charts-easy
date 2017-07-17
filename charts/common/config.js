/**
 * @Author:       lee
 * @Email:        i@funlee.cn
 * @DateTime:     2017-07-08 17:30:00
 * @Description:  根据默认配置项和用户配置项，获取绘图配置项
 * @Last Modified:2017-07-08 17:30:00
 */
export default (defaultCfg,userCfg) => {
    return Object.assign(defaultCfg,userCfg)
}