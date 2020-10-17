import dayjs from 'dayjs';

const DATE_FORMAT = 'YYYY-MM-DD';

Component({
  properties: {
    startDateValue: {
      type: String,
      value: dayjs().startOf('month').startOf('hour').format(DATE_FORMAT)
    },
    endDateValue: {
      type: String,
      value: dayjs().endOf('month').endOf('hour').format(DATE_FORMAT)
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
        startDate,
        endDate
      });
    }
  }
})
