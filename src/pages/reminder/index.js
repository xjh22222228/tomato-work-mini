import pullUpPagination from '../../behaviors/pullUpPagination';
import { merge } from '../../utils/object';
import { serviceGetReminder, serviceDeleteReminder } from '../../services/reminder';

Page(merge(pullUpPagination, {
  data: {
    currentData: null,
    popupShow: false
  },
  getData(params) {
    return serviceGetReminder({
      sort: 'type-desc',
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
