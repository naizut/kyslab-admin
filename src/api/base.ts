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
  method: 'post',
  timeout: 30000
})

// 请求拦截器
baseService.interceptors.request.use(
  (config: any) => {
    const { customConfig } = config // 取出自定义的config参数
    config.headers = {
      'Content-Type': 'application/json',
    }

    config = Object.assign(config, customConfig)

    return config
  },
  (err: any) => Promise.reject(err)
)

// 响应拦截器
baseService.interceptors.response.use(
  (response: any) => {
    const res = response.data
    return Promise.resolve(res)
  },

  (error:any) => {
    if (axios.isCancel(error)) {
      return Promise.reject(`限制短时间内重复请求`)
    }

    return Promise.reject(`网络请求出错，请检查`)
  }
)

