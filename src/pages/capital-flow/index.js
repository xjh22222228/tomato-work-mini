import pullUpPagination from '../../behaviors/pullUpPagination';
import { serviceGetCapitalFlow, serviceDeleteCapitalFlow } from '../../services/capitalFlow';
import { merge } from '../../utils/object';

Page(merge(pullUpPagination, {
  data: {
    pagination: {
      isInitData: false
    },
    consumption: 0,     // 支出
    income: 0,          // 收入
    available: 0,       // 实际收入
    startDate: null,
    endDate: null,
    keyword: '',
    createPopupShow: false,
    currentData: null
  },
  async getData(params) {
    const { startDate, endDate, keyword } = this.data;
    const result = await serviceGetCapitalFlow({
      type: '',
      typeNameId: '',
      startDate,
      endDate,
      keyword,
      ...params
    });

    this.setData({
      consumption: result.consumption,
      income: result.income,
      available: result.available
    });
    
    return result;
  },
  onSearchChange(e) {
    this.setData({ keyword: e.detail });
  },
  getDateValue(e) {
    const { startDateTimestamp, endDateTimestamp } = e.detail;
    this.setData({
      startDate: startDateTimestamp,
      endDate: endDateTimestamp
    });
    this.$resetData();
  },
  handleToggleCreatePopupShow() {
    this.setData({
      createPopupShow: !this.data.createPopupShow,
      currentData: null
    });
  },
  handleDelete(e) {
    const { id } = e.currentTarget.dataset;
    serviceDeleteCapitalFlow(id)
    .then(() => {
      this.$refreshData();
    });
  },
  handleClickCell(e) {
    const { detail } = e.currentTarget.dataset;
    this.setData({
      createPopupShow: true,
      currentData: detail
    });
  }
}))
