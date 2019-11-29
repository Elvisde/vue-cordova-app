export default {
  // 基础url前缀
  // baseURL: process.env.NODE_ENV === 'production' ? '/' : 'http://accountv3.mipsyun.com',

  baseURL: 'http://accountv3.mipsyun.com',
  // baseURL: 'http://192.9.51.222:9936',
  headers: {
    'Content-Type': 'application/json;charset=UTF-8'
  },
  // 参数
  data: {},
  // 设置超时时间
  timeout: 10000,
  // 携带凭证
  // withCredentials: process.env.NODE_ENV !== 'production',
  withCredentials: true,

  // 返回数据类型
  responseType: 'json'
}
