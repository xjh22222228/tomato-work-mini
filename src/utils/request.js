import CONFIG from '../config/index'
import { normalizeUrl } from './url'
import { filterNil } from './object'
import { navigateTo } from './wxApi'
import { LOGIN_URL } from '../constants/routePath'

const ERROR_TEXT = '系统繁忙'
const LOADING_TEXT = '正在加载...'
const { network } = CONFIG

function handleError(res) {
  if (res.data.errorCode === 401) {
    navigateTo(LOGIN_URL)
  }
  wx.showToast({
    title: res.data.msg,
    icon: 'none'
  })
}

Promise.prototype.finally = function (callback) {
  let P = this.constructor
  return this.then(
    value => P.resolve(callback()).then(() => value),
    reason => P.resolve(callback()).then(() => { throw reason })
  )
}

export default function request(object) {
  return new Promise((resolve, reject) => {
    const { globalData } = getApp()
    const userInfo = globalData.userInfo

    const config = {
      // 请求成功是否弹框提示
      successAlert: false,
      // 请求失败是否弹框提示
      errorAlert: true,
      ...object
    }

    // 请求默认数据
    config.data = filterNil({
      ...object.data
    })

    // 请求是否显示 loading
    config.isLoading = 'isLoading' in config
      ? config.isLoading
      : config.data.pageNo === 0
    // 请求中的文字
    config.loadingText = 'loadingText' in config ? config.loadingText : LOADING_TEXT
    // 请求失败提示语
    config.errorText = config.errorText || ERROR_TEXT
    // 请求头
    config.header = {
      token: userInfo.token,
      ...config.header
    }

    config.url = network.baseUrl + normalizeUrl(config.url, config.data)

    if (config.isLoading) {
      wx.showLoading({ title: config.loadingText, mask: true })
    }

    config.success = async function (res) {
      if (res.statusCode === 200) {
        if (res.data.success) {
          const data = res.data

          if (config.successAlert) {
            wx.showToast({
              title: config.successText || data.message,
              icon: 'none'
            })
          }

          resolve(data.data)
          return
        }
      }

      (config.errorAlert && handleError(res))
      reject(res)
    }

    config.fail = function (res) {
      (config.errorAlert && handleError(res))
      reject(res)
    }

    config.complete = function () {
      config.isLoading && wx.hideLoading()
    }

    wx.request(config)
  })
}

function fn(method) {
  return (url, data, config) => {
    return request({ url, data, method, ...config })
  }
}

export const get = fn('GET')
export const del = fn('DELETE')
export const post = fn('POST')
export const put = fn('PUT')
