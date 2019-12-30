import { isObject } from './validate'

/**
 * 将对象合并到目标源
 * @example
 * { a: [{ b: 2 }] } { a: [{ c: 2 }]} -> { a: [{b:2}, {c:2}]}
 * merge({o: {a: 3}}, {o: {b:4}}) => {o: {a:3, b:4}}
 * @return {Object}
 */
export function merge(source, other) {
  if (!isObject(source) || !isObject(other)) {
    return other === undefined ? source : other
  }
  // 合并两个对象的 key，另外要区分数组的初始值为 []
  return Object.keys({
    ...source,
    ...other
  }).reduce((acc, key) => {
    // 递归合并 value
    acc[key] = merge(source[key], other[key])
    return acc
  }, Array.isArray(source) ? [] : {})
}

/**
 * 过滤掉值为 `null` / `undefined`
 * @example
 * { data: null, say: undefined }  // {}
 */
export function filterNil(object) {
  if (!isObject(object)) {
    return object
  }

  for (let k in object) {
    if (object[k] == null) {
      delete object[k]
    } else {
      filterNil(object[k])
    }
  }
  
  return object
}
