
/**
 * 返回一个规范化url
 * @example
 * normalizeUrl('example/${user}/user?code=${code}', {
 *   user: 'foo',
 *   code: '2828'
 * }) // => example/foo/user?code=2828
 */
export function normalizeUrl(url, data) {
  if (typeof data !== 'object') return url
  const regex = /\$\{(\w{1,})\}/gi
  const result = url.match(regex)
  if (result === null && !Array.isArray(result)) return url
  result.forEach(item => {
    const fieldName = item.replace(/[${}]/g, '')
    if (fieldName in data) {
      url = url.replace(item, data[fieldName])
      delete data[fieldName]
    }
  })
  return url
}
