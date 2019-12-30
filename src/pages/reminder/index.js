import pullUpPagination from '../../behaviors/pullUpPagination';
import { merge } from '../../utils/object';
import { serviceGetReminder, serviceDeleteReminder } from '../../services/reminder';

Page(merge(pullUpPagination, {
  data: {
    startDate: null,
    endDate: null,
    currentData: null,
    popupShow: false
  },
  getDateValue(e) {
    const { startDateTimestamp, endDateTimestamp } = e.detail;
    this.setData({
      startDate: startDateTimestamp,
      endDate: endDateTimestamp
    });
    this.$resetData();
  },
  getData(params) {
    const { startDate, endDate } = this.data;
    return serviceGetReminder({
      startDate,
      endDate,
      ...params
    });
  },
  handleClickCell(e) {
    const { detail } = e.currentTarget.dataset;
    this.setData({
      popupShow: true,
      currentData: detail
    });
  },
  handleDelete(e) {
    const { id } = e.currentTarget.dataset;
    serviceDeleteReminder(id)
    .then(() => {
      this.$refreshData();
    });
  },
  onPopupClose() {
    this.setData({ popupShow: false });
  },
  onClickCreateButton() {
    this.setData({
      popupShow: true,
      currentData: null
    });
  }
}))
