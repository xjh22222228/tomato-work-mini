import pullUpPagination from '../../behaviors/pullUpPagination'
import { serviceGetCapitalFlow, serviceDeleteCapitalFlow } from '../../services/capitalFlow'
import merge from 'lodash.merge'

Page(merge(pullUpPagination, {
  data: {
    pagination: {
      isInitData: false
    },
    consumption: 0, // 支出
    income: 0, // 收入
    available: 0, // 实际收入
    startDate: null,
    endDate: null,
    keyword: '',
    filter: {
      value: null,
      options: [
        { text: '显示默认', value: null },
        { text: '从低到高', value: 'asc' },
        { text: '从高到底', value: 'desc' }
      ]
    },
    createPopupShow: false,
    currentData: null
  },
  async getData(params) {
    const { startDate, endDate, keyword, filter } = this.data
    const result = await serviceGetCapitalFlow({
      type: '',
      typeNameId: '',
      startDate,
      endDate,
      keyword,
      sort: filter.value && `price-${filter.value}`,
      ...params
    })

    this.setData({
      consumption: result.consumption,
      income: result.income,
      available: result.available
    })

    return result
  },
  onSearchChange(e) {
    this.setData({ keyword: e.detail })
  },
  getDateValue(e) {
    const { startDate, endDate } = e.detail
    this.setData({
      startDate,
      endDate
    })
    this.$resetData()
  },
  handleToggleCreatePopupShow() {
    this.setData({
      createPopupShow: !this.data.createPopupShow,
      currentData: null
    })
  },
  handleDelete(e) {
    const { id } = e.currentTarget.dataset
    serviceDeleteCapitalFlow(id)
    .then(() => {
      this.$refreshData()
    })
  },
  onClickCell(e) {
    const { detail } = e.currentTarget.dataset
    this.setData({
      createPopupShow: true,
      currentData: detail
    })
  },
  onDropDownChange(e) {
    this.setData({ 'filter.value': e.detail })
    this.$resetData()
  }
}))
