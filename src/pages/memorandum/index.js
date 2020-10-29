import { serviceGetMemorandum, serviceDeleteMemorandumById } from '../../services/memorandum'
import { MEMORANDUM_EDITOR_URL } from '../../constants/routePath'
import { navigateTo } from '../../utils/wxApi'

Page({
  data: {
    data: [],
    MEMORANDUM_EDITOR_URL
  },
  onShow() {
    this.getData()
  },
  getData() {
    serviceGetMemorandum()
    .then(res => {
      this.setData({ data: res })
    })
  },
  onClickCell(e) {
    const { id } = e.currentTarget.dataset
    navigateTo(MEMORANDUM_EDITOR_URL, { id })
  },
  onDelete(e) {
    const { id } = e.currentTarget.dataset
    serviceDeleteMemorandumById(id)
    .then(() => {
      this.getData()
    })
  }
})
