
Component({
  externalClasses: ['custom-class'],
  properties: {
    type: {
      type: Number,
      optionalTypes: [String],
      value: -1
    },
    customStyle: String,
    message: {
      type: String,
      value: '暂无数据'
    }
  }
})
