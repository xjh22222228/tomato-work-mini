/**
 * 上拉加载更多数据
 * @author xiejiahe
 *  
 *  示例：
 *  Page(merge(pullUpPagination, {
 *    data: {
 *      // 可选, 是否从后台取所有数据，由前端进行分页处理, 不适用于大数据
 *      pagination: {
 *        autoPage: false
 *      }
 *    },
 * 
 *    // 必须显示指定 `getData` 函数并返回 `service`
 *    getData(params) {
 *      return serviceGetAllCollection(params);
 *    },
 * 
 *    // do something ...
 *  }))
 * 
 *  如果引入了当前 `mixins` 页面的生命周期需要修改
 *  onLoad => onLoadCallback
 */

export default {
  data: {
    data: [],
    pagination: {
      pageNo: 0,
      pageSize: 30,
      hasMore: true,
      loading: false,
      autoPage: false,
      // 自动初始化数据， 否则需要手动调用 `$getData`
      isInitData: true
    },
    _cacheAllData: []
  },
  onLoad(options) {
    this.onLoadCallback && this.onLoadCallback(options);
    this.data.pagination.isInitData && this.$getData();
  },
  onReachBottom() {
    const { pagination, _cacheAllData } = this.data;
    if (pagination.loading || !pagination.hasMore) return;
    
    if (pagination.autoPage && _cacheAllData.length) {
      this._getCacheData();
    } else {
      this.setData({ 'pagination.loading': true });
      this.$getData();
    }
  },
  _getCacheData() {
    const { pagination: { pageNo, pageSize }, _cacheAllData } = this.data;
    const data = _cacheAllData.slice((pageNo - 1) * pageSize, pageSize * pageNo);
    this.setData({
      data: this.data.data.concat(data),
      'pagination.pageNo': pageNo + 1,
      'pagination.hasMore': data.length >= pageSize
    });
  },
  $getData(params, config, isEmptyData) {
    const { pagination } = this.data;

    if (!this.getData) return;

    this.getData({
      pageNo: pagination.pageNo,
      pageSize: pagination.autoPage ? Number.MAX_SAFE_INTEGER : pagination.pageSize,
      ...params
    }, config)
    .then(res => {
      const data = Array.isArray(res) ? res : res.rows;
      const state = {
        data: isEmptyData ? data : this.data.data.concat(data),
        'pagination.pageNo': pagination.pageNo + 1,
        'pagination.hasMore': data.length === 0 ? true : data.length >= pagination.pageSize
      };

      if (pagination.autoPage) {
        state._cacheAllData = data;
        state.data = data.slice(0, pagination.pageSize);
      }

      this.setData(state);
    })
    .finally(() => {
      this.setData({ 'pagination.loading': false });
    });
  },
  /**
   * 如果页面是 tabs 等特殊形式的，每次切换调用此方法
   * @param {Boolean} [isEmptyData] - 数据清空再请求新的数据
   */
  $resetData(isEmptyData = false) {
    const params = {
      _cacheAllData: [],
      pagination: {
        pageNo: 0,
        pageSize: 30,
        hasMore: true,
        loading: false,
        autoPage: false
      }
    };

    if (isEmptyData) {
      params.data = [];
    }

    this.setData(params);
    this.$getData(null, null, true);
  },
  /**
   * 刷新数据, 保留现有分页状态
   */
  $refreshData() {
    const { pagination } = this.data;
    this.$getData({
      pageNo: 0,
      pageSize: pagination.pageNo * pagination.pageSize
    }, null, true);
  }
}
