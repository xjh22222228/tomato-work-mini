const WxParse = require('../../lib/wxParse/wxParse.js')

Component({
  properties: {
    html: {
      type: String,
      observer() {
        this.initRichText()
      }
    }
  },
  lifetimes: {
    attached() {
      this.initRichText()
    }
  },
  methods: {
    initRichText() {
      WxParse.wxParse('richText', 'html', this.properties.html, this, 5)
    }
  }
})
