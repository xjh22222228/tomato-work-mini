import md5 from 'blueimp-md5';
import Notify from '../../../miniprogram_npm/@vant/weapp/notify/notify';
import { serviceLogin } from '../../services/user';
import { LOGIN_NAME } from '../../constants/index';

Component({
  properties: {
    show: {
      type: Boolean,
      observer(newVal) {
        if (newVal) {
          wx.hideTabBar();
        } else {
          wx.showTabBar();
        }
      }
    }
  },
  data: {
    loading: false,
    loginName: wx.getStorageSync(LOGIN_NAME),
    password: ''
  },
  methods: {
    onInputChange(e) {
      const fieldName = e.currentTarget.dataset.name;
      this.setData({ [fieldName]: e.detail });
    },
    onClose() {
      this.triggerEvent('close');
      wx.showTabBar();
    },
    handleSubmitLogin() {
      const { loginName, password } = this.data;

      try {
        if (!loginName || !password) {
          throw new Error('账号或密码不能为空');
        }
      } catch (err) {
        return Notify({
          type: 'warning',
          message: err.message,
          context: this
        });
      }

      this.setData({ loading: true });

      serviceLogin({
        loginName,
        password: md5(password).toLocaleLowerCase()
      })
      .then(() => {
        this.onClose();
      })
      .finally(() => {
        this.setData({ loading: false });
      });
    },
    handleVisitorLogin() {
      this.setData({
        loginName: 'test',
        password: '123456'
      });
      this.handleSubmitLogin();
    }
  }
})
