import {
  getCurMonthFirstDay,
  getCurMonthLastDay,
  getStartTimestampByDate,
  getEndTimestampByDate
} from '../../utils/date';


Component({
  properties: {
    startDateValue: {
      type: String,
      value: getCurMonthFirstDay('YYYY-MM-DD')
    },
    endDateValue: {
      type: String,
      value: getCurMonthLastDay('YYYY-MM-DD')
    },
    fields: {
      type: String,
      value: 'day'
    }
  },
  data: {
    startDate: null,
    endDate: null
  },
  lifetimes: {
    attached() {
      const { startDateValue, endDateValue } = this.properties;
      this.setData({
        startDate: startDateValue,
        endDate: endDateValue
      });
      this.triggerConfirmEvent();
    }
  },
  methods: {
    getStartDateValue(e) {
      this.setData({ startDate: e.detail.value });
      this.triggerConfirmEvent();
    },
    getEndDateValue(e) {
      this.setData({ endDate: e.detail.value });
      this.triggerConfirmEvent();
    },
    triggerConfirmEvent() {
      const { startDate, endDate } = this.data;
      this.triggerEvent('confirm', {
        startDateTimestamp: getStartTimestampByDate(startDate),
        endDateTimestamp: getEndTimestampByDate(endDate),
        startDate,
        endDate
      });
    }
  }
})
