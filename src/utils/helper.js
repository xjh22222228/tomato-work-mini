
/**
 * 函数节流
 */
export function throttle(func, delay = 500) {
  let timer = null;
  let startTime = Date.now();

  return function() {
    const curTime = Date.now();
    const remaining = delay - (curTime - startTime);
    const context = this;
    const args = arguments;
    clearTimeout(timer);
    
    if (remaining <= 0) {
      func.apply(context, args);
      startTime = Date.now();
    } else {
      timer = setTimeout(func, remaining);
    }
  }
}

/**
 * 函数防抖
 * @param {Function} func - 函数
 * @param {Number} [delay] - 延迟执行毫秒数
 * @param {Boolean} [immediate] - true 表立即执行，false 表非立即执行
 */
export function debounce(func, delay = 500, immediate) {
  let timeout;

  return function (...rest) {
    let context = this;
    let args = rest;

    if (timeout) clearTimeout(timeout);
    if (immediate) {
      let callNow = !timeout;
      timeout = setTimeout(() => {
        timeout = null;
      }, delay)
      if (callNow) func.apply(context, args);
    } else {
      timeout = setTimeout(() => {
        func.apply(context, args);
      }, delay);
    }
  }
}

// 随机生成字符串
export function randomCode(num = 4) {
  const str = 'qwertyuipasdfghjklxcvbnm13456789';
  let data = '';

  for (let i = 0; i < num; i++) {
    const random = Math.floor(Math.random() * str.length);
    data += str[random];
  }

  return data;
}
