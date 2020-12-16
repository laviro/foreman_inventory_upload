import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as actions from './InsightsCloudSyncActions';
import InsightsCloudSync from './InsightsCloudSync';
import insightsCloudSyncReducers from './InsightsCloudSyncReducers';
import {
  selectPage,
  selectPerPage,
  selectSearch,
  selectSortBy,
  selectSortOrder,
  selectHits,
  selectItemCount,
} from './InsightsCloudSyncSelectors';

// map state to props
const mapStateToProps = state => ({
  query: selectSearch(state),
  page: selectPage(state),
  perPage: selectPerPage(state),
  sortBy: selectSortBy(state),
  sortOrder: selectSortOrder(state),
  hits: selectHits(state),
  itemCount: selectItemCount(state),
});

// map action dispatchers to props
const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

// export reducers
export const reducers = insightsCloudSyncReducers;

// export connected component
export default connect(mapStateToProps, mapDispatchToProps)(InsightsCloudSync);
