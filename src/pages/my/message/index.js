import pullUpPagination from '../../../behaviors/pullUpPagination';
import { merge } from '../../../utils/object';
import { serviceGetInnerMessage } from '../../../services/innerMessage';

Page(merge(pullUpPagination, {
  data: {
    
  },
  getData() {
    return serviceGetInnerMessage();
  }
}))
