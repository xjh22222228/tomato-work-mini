import dayjs from 'dayjs';
import Dialog from '../../../../../@vant/weapp/dialog/dialog';
import {
  serviceGetCapitalFlowType,
  serviceCreateCapitalFlow,
  serviceUpdateCapitalFlow,
  serviceDeleteCapitalFlow
} from '../../../../services/capitalFlow';

const format = 'YYYY-MM-DD';

Component({
  options: {
    styleIsolation: 'shared'
  },
  properties: {
    show: Boolean,
    data: {
      type: null,
      observer(value) {
        if (value) {
          this.setData({
            price: value.price,
            remarks: value.remarks,
            classifyValue: value.typeId,
            date: dayjs(value.date).format(format)
          });
        }
      }
    }
  },
  data: {
    classifyList: [],
    classifyValue: null,
    date: dayjs().format(format),
    confirmLoading: false,
    price: '',
    remarks: ''
  },
  lifetimes: {
    attached() {
      this.getData();
    }
  },
  methods: {
    getData() {
      serviceGetCapitalFlowType()
      .then(res => {
        if (res.length) {
          this.setData({
            classifyList: res,
            classifyValue: res[0].id
          });
        }
      });
    },
    onClose() {
      this.triggerEvent('close');
    },
    onInputChange(e) {
      const { fieldName } = e.currentTarget.dataset;
      this.setData({ [fieldName]: e.detail });
    },
    onDateChange(e) {
      this.setData({ date: e.detail.value });
    },
    onDropdownChange(e) {
      this.setData({ classifyValue: e.detail });
    },
    handleDeleteButton() {
      Dialog.confirm({
        message: '确定要删除吗？',
        confirmButtonText: '删除',
        context: this
      }).then(() => {
        serviceDeleteCapitalFlow(this.properties.data.id)
        .then(() => {
          this.onClose();
          this.triggerEvent('success');
        });
      }).catch(() => {});
    },
    handleSubmit() {
      const { classifyValue, remarks, price = 0, date } = this.data;
      const { data } = this.properties;
      const timestamp = dayjs(date).valueOf();
      const params = {
        date: (Date.now() - timestamp) + timestamp,
        typeId: classifyValue,
        price: Number(price),
        remarks
      };

      this.setData({ confirmLoading: true });

      (
        data 
        ? serviceUpdateCapitalFlow(data.id, params) 
        : serviceCreateCapitalFlow(params)
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
