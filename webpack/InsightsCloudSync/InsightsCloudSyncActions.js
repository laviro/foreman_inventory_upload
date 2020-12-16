import { push } from 'connected-react-router';
import URI from 'urijs';
import API from 'foremanReact/API';
import { get } from 'foremanReact/redux/API';
import { addToast } from 'foremanReact/redux/actions/toasts';
import { insightsCloudUrl } from './InsightsCloudSyncHelpers';
import { selectQueryParams } from './InsightsCloudSyncSelectors';
import {
  INSIGHTS_CLOUD_SYNC_SUCCESS,
  INSIGHTS_HITS_PATH,
  INSIGHTS_HITS_API_KEY,
  INSIGHTS_PATH,
} from './InsightsCloudSyncConstants';

export const syncInsights = () => async dispatch => {
  try {
    await API.post(insightsCloudUrl('tasks'));
    dispatch({
      type: INSIGHTS_CLOUD_SYNC_SUCCESS,
      payload: {},
    });
  } catch ({ message }) {
    dispatch(
      addToast({
        sticky: true,
        type: 'error',
        message,
      })
    );
  }
};

export const updateUrlQuery = (queryParams = {}) => (dispatch, getState) => {
  const { page, perPage, query, sortBy, sortOrder } = {
    ...selectQueryParams(getState()),
    ...queryParams,
  };
  const uri = new URI();
  uri.search({
    page,
    per_page: perPage,
    search: query,
    sort_by: sortBy,
    sort_order: sortOrder,
  });

  dispatch(
    push({
      pathname: INSIGHTS_PATH,
      search: uri.search(),
    })
  );
};

export const fetchInsights = ({
  page,
  perPage,
  query,
  sortBy,
  sortOrder,
} = {}) =>
  get({
    key: INSIGHTS_HITS_API_KEY,
    url: INSIGHTS_HITS_PATH,
    params: {
      page,
      per_page: perPage,
      search: query,
      order: `${sortBy} ${sortOrder}`,
    },
  });
