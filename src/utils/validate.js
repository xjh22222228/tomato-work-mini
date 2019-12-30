
// 判断是否是一个 url
export function isUrl(url) {
  const regex = /(http|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/
  return regex.test(url)
}

// 是否是一个对象
export function isObject(value) {
  const type = typeof value
  return value !== null && (type === 'object' || type === 'function')
}
