const axios = require('axios')

/**
 * 阻止重复请求
 * @param {array} reqList - 请求缓存列表
 * @param {string} url - 当前请求地址
 * @param {function} cancel - 请求中断函数
 * @param {string} errorMessage - 请求中断时需要显示的错误信息
 */

export const baseService = axios.create({
  baseURL: '/api',
  method: 'POST',
  timeout: 30000
})

// 请求拦截器
baseService.interceptors.request.use(
  (config: any) => {
    const { customConfig } = config // 取出自定义的config参数

    config = Object.assign(config, customConfig)
    config.headers = {
      'Content-Type': 'application/json',
      'ka-access-token': window.localStorage.getItem('ka-access-token') || ''
    }

    return config
  },
  (err: any) => Promise.reject(err)
)

// 响应拦截器
baseService.interceptors.response.use(
  (response: any) => {
    return Promise.resolve(response.data)
  },

  (error:any) => {
    const { code } = error.response.data
    if (code === 20001 || code === 20002) {
      window.localStorage.setItem('ka-access-token', '')
      window.location.href = '/login'
    }
    return Promise.reject(`网络请求出错，请检查`)
  }
)

