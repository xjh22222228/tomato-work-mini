/**
 * 微信API接口封装
 * @author xiejiahe
 */

/**
 * 预览图片
 * @param {String|Array} urls
 * @example
 * previewImage('/example.png')
 * previewImage(['/example.png', '/example.png'], 1)
 * previewImage([{ url: '/example.png' }], 0, 'url')
 */
export function previewImage(urls, index = 0, keyName) {
  if (typeof urls === 'string') {
    urls = [urls]
  }

  /* eslint-disable */
  if (keyName != null) {
    urls = urls.map((el) => el[keyName])
  }

  wx.previewImage({
    current: urls[index],
    urls,
  })
}

/**
 * 路由跳转
 * @param {Object|String} params
 * @param {Object} data - URL字符串查询
 * @example
 * navigateTo('/');
 * navigateTo('/', { title: 'WeChat' });
 * navigateTo({ url: '/'}, { title: 'WeChat' });
 */
export const navigateTo = navigate('navigateTo')
export const redirectTo = navigate('redirectTo')
export const reLaunch = navigate('reLaunch')
function navigate(name) {
  return function (params, data) {
    let object = {}
    if (typeof params === 'string') {
      object.url = params
    } else {
      object = { ...params }
    }

    if (data) {
      object.url += '?_t=t'

      for (const k in data) {
        if (data[k] != null) {
          url += `&${k}=${data[k]}`
        }
      }
    }

    return wx[name](object)
  }
}
