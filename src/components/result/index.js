
Component({
  externalClasses: ['custom-class'],
  properties: {
    // error
    status: {
      type: String,
      value: 'error'
    },
    message: {
      type: String,
      value: '出错了，点击重试'
    }
  },
  methods: {
    onClickMessage() {
      this.triggerEvent('clickMessage')
    }
  }
})
