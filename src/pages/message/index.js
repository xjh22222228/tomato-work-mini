import pullUpPagination from '../../behaviors/pullUpPagination';
import merge from 'lodash.merge';
import { serviceGetInnerMessage, serviceUpdateInnerMessageHasRead } from '../../services/innerMessage';

Page(merge(pullUpPagination, {
  async getData() {
    const res = await serviceGetInnerMessage();
    const ids = res.rows.map(msg => !msg.hasRead ? msg.id : '').join(',');
    ids && serviceUpdateInnerMessageHasRead(ids);
    return res;
  }
}))
