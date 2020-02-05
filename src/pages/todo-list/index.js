import pullUpPagination from '../../behaviors/pullUpPagination';
import { merge } from '../../utils/object';
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
      startDate: 0,
      endDate: Date.now(),
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
  }
}))
