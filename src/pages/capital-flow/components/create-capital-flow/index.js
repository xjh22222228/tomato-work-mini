import dayjs from 'dayjs'
import Dialog from '@vant/weapp/dialog/dialog'
import {
  serviceGetCapitalFlowType,
  serviceCreateCapitalFlow,
  serviceUpdateCapitalFlow,
  serviceDeleteCapitalFlow
} from '../../../../services/capitalFlow'

const FORMAT = 'YYYY-MM-DD'

Component({
  options: {
    styleIsolation: 'shared'
  },
  properties: {
    show: {
      type: Boolean,
      observer(isShow) {
        setTimeout(() => {
          this.setData({
            focus: isShow
          })
        }, 200)
      }
    },
    data: {
      type: null,
      observer(value) {
        if (value) {
          this.setData({
            price: value.price,
            remark: value.remark,
            classifyValue: value.typeId,
            date: dayjs(value.createdAt).format(FORMAT),
          })
        }
      }
    }
  },
  data: {
    classifyList: [],
    classifyValue: null,
    date: dayjs().format(FORMAT),
    confirmLoading: false,
    price: '',
    remark: '',
    focus: false
  },
  lifetimes: {
    attached() {
      this.getData()
    }
  },
  methods: {
    getData() {
      serviceGetCapitalFlowType()
      .then(res => {
        if (res.length) {
          this.setData({
            classifyList: res,
            classifyValue: res[0].id
          })
        }
      })
    },
    onClose() {
      this.triggerEvent('close')
    },
    onInputChange(e) {
      const { fieldName } = e.currentTarget.dataset
      this.setData({ [fieldName]: e.detail })
    },
    onDateChange(e) {
      this.setData({ date: e.detail.value })
    },
    onDropdownChange(e) {
      this.setData({ classifyValue: e.detail })
    },
    handleDeleteButton() {
      Dialog.confirm({
        message: '确定要删除吗？',
        confirmButtonText: '删除',
        context: this
      }).then(() => {
        serviceDeleteCapitalFlow(this.properties.data.id)
        .then(() => {
          this.onClose()
          this.triggerEvent('success')
        })
      }).catch(() => {})
    },
    handleSubmit() {
      const { classifyValue, remark, price = 0, date } = this.data
      const { data } = this.properties
      const params = {
        date: dayjs(date).format('YYYY-MM-DD HH:mm:ss'),
        typeId: classifyValue,
        price: Number(price),
        remark
      }

      this.setData({ confirmLoading: true });

      (
        data
        ? serviceUpdateCapitalFlow(data.id, params)
        : serviceCreateCapitalFlow(params)
      )
      .then(() => {
        this.onClose()
        this.triggerEvent('success')
      })
      .finally(() => {
        this.setData({ confirmLoading: false })
      })
    }
  }
})
