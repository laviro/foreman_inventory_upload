import React, { useEffect } from 'react';
import { Button } from 'patternfly-react';
import PropTypes from 'prop-types';
import { Pagination, PaginationVariant } from '@patternfly/react-core';
import { Table, TableHeader, TableBody } from '@patternfly/react-table';
import { translate as __ } from 'foremanReact/common/I18n';
import PageLayout from 'foremanReact/routes/common/PageLayout/PageLayout';
import { useForemanSettings } from 'foremanReact/Root/Context/ForemanContext';
import InsightsHeader from './Components/InsightsHeader';
import {
  columns,
  mapResultsToRows,
  perPageOptions,
  getSortColumnIndex,
  actions,
} from './Components/InsightsTable/InsightsTableHelpers';
import SelectAll from './Components/InsightsTable/SelectAll';
import './Components/InsightsTable/table.scss';
import {
  INSIGHTS_SYNC_PAGE_TITLE,
  INSIGHTS_SEARCH_PROPS,
} from './InsightsCloudSyncConstants';

const InsightsCloudSync = ({
  syncInsights,
  updateUrlQuery,
  query,
  fetchInsights,
  page,
  perPage: urlPerPage,
  sortBy,
  sortOrder,
  hits,
  itemCount,
  onTableSetPage,
  onTablePerPageSelect,
  onTableSort,
  onTableSelect,
  selectedIds,
  showSelectAllAlert,
}) => {
  const { perPage: appPerPage } = useForemanSettings();
  const perPage = urlPerPage || appPerPage;
  useEffect(() => {
    fetchInsights({ page, perPage, query, sortBy, sortOrder });
  }, [fetchInsights, page, perPage, query, sortBy, sortOrder]);
  return (
    <PageLayout
      searchable
      searchProps={INSIGHTS_SEARCH_PROPS}
      onSearch={searchQuery => updateUrlQuery({ query: searchQuery, page: 1 })}
      header={INSIGHTS_SYNC_PAGE_TITLE}
      toolbarButtons={
        <Button bsStyle="primary" onClick={syncInsights}>
          {__('Sync now')}
        </Button>
      }
      searchQuery={query}
      beforeToolbarComponent={<InsightsHeader />}
    >
      <SelectAll
        itemCount={itemCount}
        selectedIds={selectedIds}
        showSelectAllAlert={showSelectAllAlert}
      />
      <Table
        aria-label="Recommendations Table"
        onSelect={(_event, isSelected, rowId) =>
          onTableSelect(_event, isSelected, rowId, hits, selectedIds)
        }
        canSelectAll
        sortBy={{ index: getSortColumnIndex(sortBy), direction: sortOrder }}
        onSort={onTableSort}
        cells={columns}
        rows={mapResultsToRows(hits, selectedIds)}
        actions={actions}
      >
        <TableHeader />
        <TableBody />
      </Table>
      <Pagination
        itemCount={itemCount}
        widgetId="recommendation-pagination"
        perPage={perPage}
        page={page}
        variant={PaginationVariant.bottom}
        onSetPage={onTableSetPage}
        onPerPageSelect={onTablePerPageSelect}
        perPageOptions={perPageOptions}
      />
    </PageLayout>
  );
};

InsightsCloudSync.propTypes = {
  syncInsights: PropTypes.func.isRequired,
  updateUrlQuery: PropTypes.func.isRequired,
  fetchInsights: PropTypes.func.isRequired,
  page: PropTypes.number,
  perPage: PropTypes.number,
  query: PropTypes.string,
  sortBy: PropTypes.string,
  sortOrder: PropTypes.string,
  hits: PropTypes.array.isRequired,
  itemCount: PropTypes.number.isRequired,
  onTableSetPage: PropTypes.func.isRequired,
  onTablePerPageSelect: PropTypes.func.isRequired,
  onTableSort: PropTypes.func.isRequired,
  onTableSelect: PropTypes.func.isRequired,
  selectedIds: PropTypes.object,
  showSelectAllAlert: PropTypes.bool,
};

InsightsCloudSync.defaultProps = {
  page: 1,
  perPage: null,
  query: '',
  sortBy: '',
  sortOrder: '',
  selectedIds: {},
  showSelectAllAlert: false,
};

export default InsightsCloudSync;
