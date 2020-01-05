import Dialog from '../../../../@vant/weapp/dialog/dialog';
import {
  serviceGetMemorandumById,
  serviceDeleteMemorandumById,
  serviceCreateMemorandum,
  serviceUpdateMemorandum
} from '../../../services/index';

const defaultTitle = '无标题';

Page({
  data: {
    title: defaultTitle,
    id: null,
    content: '',
    defaultTitle
  },
  onLoad({ id }) {
    if (id) {
      this.setData({ id });
      this.getData();
    }
  },
  onInputChange(e) {
    this.setData({ title: e.detail });
  },
  getData() {
    const { id } = this.data;
    if (!id) return;
    serviceGetMemorandumById(id)
    .then(res => {
      this.setData({
        title: res.title,
        content: res.markdown
      });
      
      this.editorCtx && this.editorCtx.setContents({ html: res.markdown });
    });
  },
  onEditorReady() {
    wx.createSelectorQuery().select('#editor').context(res => {
      this.editorCtx = res.context;
      this.editorCtx.setContents({ html: this.data.content });
    }).exec();
  },
  onEditorChange(e) {
    this.setData({ content: e.detail.text });
  },
  onDelete() {
    Dialog.confirm({
      message: '确定要删除吗？',
      confirmButtonText: '删除'
    }).then(() => {
      serviceDeleteMemorandumById(this.data.id)
      .then(() => {
        wx.navigateBack();
      });
    }).catch(() => {});
  },
  onFinish() {
    const { id, title, content } = this.data;
    const params = {
      markdown: content,
      title: title || defaultTitle
    };

    (
      id 
      ? serviceUpdateMemorandum(id, params)
      : serviceCreateMemorandum(params)
    ).then(() => {
      wx.navigateBack();
    });
  }
})
