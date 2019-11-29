import axios from './axios' // 倒入 api

// 获取出品列表
const login = params => {
  return axios({
    url: '/signin',
    method: 'post',
    params
  })
}
const resetPhone = params => {
  return axios({
    url: '/password-reset/phone',
    method: 'post',
    params
  })
}
const verifycode = params => {
  return axios({
    url: '/password-reset/code',
    method: 'post',
    params
  })
}
const resetPassword = params => {
  return axios({

    url: '/password-reset/password',
    method: 'post',
    params
  })
}
const checkname = params => { // 校验注册名称的唯一性
  return axios({
    url: '/signup-check/name',
    method: 'post',
    params
  })
}
const getsignCode = params => {
  return axios({
    url: '/signup-check/phone',
    method: 'post',
    params
  })
}
const getsign = params => {
  return axios({
    url: '/signup',
    method: 'post',
    params
  })
}
const getOrder = params => {
  return axios({
    url: '/index/getOrderAmountStatistics',
    method: 'post',
    params
  })
}
const addvisitor = params => {
  return axios({
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' // 这里改成表单上传
    },
    // transformRequest: [
    //   function (params) {
    //     console.log(params)
    //   }
    // ],
    url: '/MIPS/employee/add-visitor',
    method: 'post',
    data: params // 参数改成data否则收不到
  })
}
export default {
  login,
  resetPhone,
  verifycode,
  resetPassword,
  getOrder,
  checkname,
  getsignCode,
  getsign,
  addvisitor
}
