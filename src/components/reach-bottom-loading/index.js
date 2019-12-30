
Component({
  properties: {
    // 显示 `loading`
    loading: {
      type: Boolean,
      value: true
    },
    // 是否还有更多数据
    hasMore: {
      type: Boolean,
      value: true
    },
    // 没有更多数据文字
    message: {
      type: String,
      value: '我是有底线的'
    }
  }
})
