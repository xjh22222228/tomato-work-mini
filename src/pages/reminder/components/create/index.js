import dayjs from 'dayjs';
import {
  serviceCreateReminder,
  serviceUpdateReminder,
} from '../../../../services/reminder';

const dateFormat = 'YYYY-MM-DD';
const timeFormat = 'HH:mm';

Component({
  properties: {
    show: Boolean,
    data: {
      type: null,
      observer(value) {
        if (value) {
          this.setData({
            content: value.content,
            date: dayjs(value.date).format(dateFormat),
            time: dayjs(value.date).format(timeFormat)
          });
        }
      }
    }
  },
  data: {
    date: dayjs().format(dateFormat),
    time: dayjs().format(timeFormat),
    content: '',
    confirmLoading: false
  },
  methods: {
    onClose() {
      this.triggerEvent('close');
    },
    onDateChange(e) {
      this.setData({ date: e.detail.value });
    },
    onTimeChange(e) {
      this.setData({ time: e.detail.value });
    },
    onInputChange(e) {
      const { fieldName } = e.currentTarget.dataset;
      this.setData({ [fieldName]: e.detail });
    },
    handleSubmit() {
      const { content, date, time } = this.data;
      const { data } = this.properties;
      const params = {
        date: dayjs(date + ' ' + time).valueOf(),
        content
      };

      this.setData({ confirmLoading: true });

      (
        data 
        ? serviceUpdateReminder(data.id, params) 
        : serviceCreateReminder(params)
      )
      .then(() => {
        this.onClose();
        this.triggerEvent('success');
      })
      .finally(() => {
        this.setData({ confirmLoading: false });
      });
    }
  }
})
