/**
 * @Author:       lee
 * @Email:        i@funlee.cn
 * @DateTime:     2017-07-15 10:59:37
 * @Description:  ajax请求
 * @Last Modified:2017-07-15 10:59:37
 */
import $ from 'jquery'
export default (config,callback) => {
    $.ajax(config).done(callback)
}


// export default (url,config={}) => {
//     return fetch(url,config)
//         .then(res=>{
//             if(res.status >= 200 && res.status < 300) {
//                 return res
//             }
//             const err = new Error(res.statusText)
//               err.response = res
//               throw err
//         })
//         .then(res=>{
//             return res
//         })
// }