// 1.注意先安装axios
// 2.倒入默认配置
// 3.序列化请求数据，视服务端的要求
import axios from 'axios'
import qs from 'qs'
import {
  Notify
} from 'vant'
import config from './config.js'

export default function $axios (options) {
  return new Promise((resolve, reject) => {
    axios.defaults.withCredentials = true
    axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

    // 创建axios对象
    const instance = axios.create({
      baseURL: config.baseURL,

      transformResponse: [function (data) {}]
      // withCredentials: true,
      // transformRequest: [
      //   function (params) {
      //     console.log(params)
      //   }
      // ]

    })

    // request 拦截器
    // instance.interceptors.request.use(
    //   config => {
    //     // Tip: 1
    //     // 请求开始的时候可以结合 vuex 开启全屏的 loading 动画
    //     // iView.LoadingBar.start()

    //     // Tip: 2
    //     // 根据请求方法，序列化传来的参数，根据后端需求是否序列化
    //     if (config.method.toLocaleLowerCase() === 'post' ||
    //       config.method.toLocaleLowerCase() === 'put' ||
    //       config.method.toLocaleLowerCase() === 'patch' ||
    //       config.method.toLocaleLowerCase() === 'delete') {
    //       config.data = qs.stringify(config.data)
    //     }
    //     console.log(config)
    //     return config
    //   },
    //   error => {
    //     // 请求错误时做些事(接口错误、超时等)
    //     // Tip: 3
    //     // 关闭loadding
    //     // iView.LoadingBar.error()

    //     //  1.判断请求超时
    //     if (error.code === 'ECONNABORTED' && error.message.indexOf('timeout') !== -1) {
    //       // return service.request(originalRequest);//例如再重复请求一次
    //     }
    //     //  2.需要重定向到错误页面
    //     const errorInfo = error.response
    //     if (errorInfo) {
    //       // error =errorInfo.data//页面那边catch的时候就能拿到详细的错误信息,看最下边的Promise.reject
    //       const errorStatus = errorInfo.status // 404 403 500 ... 等
    //       // router.push({
    //       //     path: `/error/${errorStatus}`
    //       // })
    //       Notify({
    //         type: 'danger',
    //         message: errorStatus
    //       })
    //     }
    //     return Promise.reject(error) // 在调用的那边可以拿到(catch)你想返回的错误信息
    //   }
    // )

    // response 拦截器
    instance.interceptors.response.use(

      response => {
        let data

        if (response.data === undefined) {
          data = response.request.responseText
        } else {
          data = response.data
        }
        switch (response.status) {
          case 208:
            response.message = '登录超时，请重新登录'
            Notify({
              type: 'danger',
              message: response.message
            })
            break
          default:
        }

        return data
      },
      err => {
        if (err && err.response) {
          switch (err.response.status) {
            case 500:
              err.message = '服务器崩溃了'
              Notify({
                type: 'danger',
                message: err.message
              })
              break

            default:
          }
        }
        // 如果后台接口统一，也可以在此处进行错误处理
        return Promise.reject(err) // 返回接口返回的错误信息
      }
    )

    // 请求处理
    instance(options)
      .then((res) => {
        resolve(res)
        return false
      })
      .catch((error) => {
        reject(error)
      })
  })
}
