/**
 * 返回顶部
 * @author xiejiahe
 * 1、页面引入当前 `mixin`
 * 2、页面使用组件 <scroll-top id="scroll-top" />
 */

import { debounce } from '../utils/helper';

export default {
  onPageScroll: debounce(function (e) {
    const el = this.selectComponent('#scroll-top');
    if (e.scrollTop > 500) {
      el && el.setData({ show: true });
    } else {
      el && el.setData({ show: false });
    }
  })
}
