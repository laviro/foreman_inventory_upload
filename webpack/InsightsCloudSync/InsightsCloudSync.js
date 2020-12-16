import React, { useEffect } from 'react';
import { Button } from 'patternfly-react';
import PropTypes from 'prop-types';
import { translate as __ } from 'foremanReact/common/I18n';
import PageLayout from 'foremanReact/routes/common/PageLayout/PageLayout';
import { useForemanSettings } from 'foremanReact/Root/Context/ForemanContext';
import InsightsHeader from './Components/InsightsHeader';
import InsightsTable from './Components/InsightsTable/InsightsTable';
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
      <InsightsTable
        updateUrlQuery={updateUrlQuery}
        results={hits}
        pagination={{ page, perPage }}
        itemCount={itemCount}
        sortBy={sortBy}
        sortOrder={sortOrder}
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
};

InsightsCloudSync.defaultProps = {
  page: 1,
  perPage: null,
  query: '',
  sortBy: '',
  sortOrder: '',
};

export default InsightsCloudSync;
