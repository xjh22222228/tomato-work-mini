import { isObject } from './validate'

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
