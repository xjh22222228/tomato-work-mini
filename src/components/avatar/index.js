
Component({
  externalClasses: ['custom-class'],
  properties: {
    url: String
  },
  data: {
    isError: false
  },
  methods: {
    onError() {
      this.setData({ isError: true })
    }
  }
})
