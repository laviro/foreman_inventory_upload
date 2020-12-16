import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'foremanReact/components/common/table';
import Pagination from 'foremanReact/components/Pagination/PaginationWrapper';
import createInsightsTableSchema from './InsightsTableSchema';

const InsightsTable = ({
  updateUrlQuery,
  results,
  pagination,
  itemCount,
  sortBy,
  sortOrder,
}) => (
  <React.Fragment>
    <Table
      key="insights-table"
      columns={createInsightsTableSchema(sortBy, sortOrder, updateUrlQuery)}
      rows={results}
      id="insights-table"
    />
    <Pagination
      viewType="list"
      itemCount={itemCount}
      pagination={pagination}
      onChange={updateUrlQuery}
      dropdownButtonId="insights-page-pagination-dropdown"
    />
  </React.Fragment>
);

InsightsTable.propTypes = {
  results: PropTypes.array.isRequired,
  updateUrlQuery: PropTypes.func.isRequired,
  pagination: PropTypes.object.isRequired,
  itemCount: PropTypes.number.isRequired,
  sortBy: PropTypes.string.isRequired,
  sortOrder: PropTypes.string.isRequired,
};

export default InsightsTable;
