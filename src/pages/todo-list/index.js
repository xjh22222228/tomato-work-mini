import pullUpPagination from '../../behaviors/pullUpPagination';
import merge from 'lodash.merge';
import dayjs from 'dayjs';
import {
  serviceGetTodoList,
  serviceUpdateTodoList,
  serviceDeleteTodoList
} from '../../services/todoList';

Page(merge(pullUpPagination, {
  data: {
    currentData: null,
    popupShow: false
  },
  getData(params, config) {
    return serviceGetTodoList({
      sort: 'status-desc',
      startDate: dayjs('2011-01-01').format('YYYY-MM-DD'),
      endDate: dayjs().format('YYYY-MM-DD'),
      ...params
    }, config);
  },
  onCheckboxChange(e) {
    const { id, status } = e.currentTarget.dataset.detail;
    serviceUpdateTodoList(id, {
      status: status === 1 ? 2 : 1
    }).then(() => {
      wx.vibrateShort();
      this.$refreshData({ isLoading: false });
    });
  },
  onDeleteClick(e) {
    serviceDeleteTodoList(e.currentTarget.dataset.id)
    .then(() => {
      this.$refreshData();
    });
  },
  onClickAction() {
    this.setData({ popupShow: true });
  },
  onPopupClose() {
    this.setData({ popupShow: false });
  },
}))
