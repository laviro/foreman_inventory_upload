import { translate as __ } from 'foremanReact/common/I18n';
import { sortableColumn } from 'foremanReact/components/common/table';
import RiskFormatter from './RiskFormatter';

const createInsightsTableSchema = (sortBy, sortOrder, updateUrlQuery) => {
  const setSort = (by, order) => {
    updateUrlQuery({ sortBy: by, sortOrder: order });
  };

  const sortController = {
    apply: setSort,
    property: sortBy,
    order: sortOrder,
  };

  const cellFormatter = value => value;

  return [
    sortableColumn('hostname', __('Hostname'), 3, sortController, [
      cellFormatter,
    ]),
    sortableColumn('title', __('Recommendation'), 8, sortController, [
      cellFormatter,
    ]),
    sortableColumn('total_risk', __('Total Risk'), 1, sortController, [
      RiskFormatter,
    ]),
  ];
};

export default createInsightsTableSchema;
