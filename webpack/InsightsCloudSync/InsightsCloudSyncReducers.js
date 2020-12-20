import { combineReducers } from 'redux';
import Immutable from 'seamless-immutable';
import { reducers as settingsReducers } from './Components/InsightsSettings';

const initialState = Immutable({ hits: [], itemCount: 0, selectedIds: {} });

export const tableReducer = (state = initialState, action) => {
  const { payload } = action;

  switch (action.type) {
    case 'SET_SELECTED_IDS':
      return state.merge(payload);
    default:
      return state;
  }
};

export default {
  InsightsCloudSync: combineReducers({
    ...settingsReducers,
    table: tableReducer,
  }),
};
