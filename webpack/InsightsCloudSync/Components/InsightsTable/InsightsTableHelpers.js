import React from 'react';
import { sortable, cellWidth } from '@patternfly/react-table';
import {
  InsightsLabel,
  Section,
} from '@redhat-cloud-services/frontend-components';

export const columns = [
  {
    sortKey: 'hostname',
    title: __('Hostname'),
    transforms: [cellWidth(20), sortable],
  },
  {
    sortKey: 'title',
    title: __('Recommendation'),
    transforms: [cellWidth(65), sortable],
  },
  {
    sortKey: 'total_risk',
    title: __('Total Risk'),
    transforms: [cellWidth(15), sortable],
  },
];

export const mapResultsToRows = (results, selectedIds) => {
  if (results.length === 0) return [];

  return results.asMutable().map(({ id, hostname, title, total_risk }) => {
    const row = [
      hostname,
      title,
      <Section className="insights-total-risk" type="icon-group">
        <InsightsLabel value={total_risk} />
      </Section>,
    ];

    row.selected = selectedIds[id];

    return row;
  });
};

export const perPageOptions = [
  { title: '5', value: 5 },
  { title: '10', value: 10 },
  { title: '20', value: 20 },
  { title: '50', value: 50 },
  { title: '100', value: 100 },
];

export const getSortColumnIndex = sortBy => {
  let colIndex = 0;
  columns.forEach((col, index) => {
    if (col.sortKey === sortBy) {
      // The checkbox column shifts the data columns by 1;
      colIndex = index + 1;
    }
  });
  return colIndex;
};

export const actions = [
  {
    title: __('Remediate'),
    onClick: (event, rowId, rowData, extra) =>
      console.log('clicked on Some action, on row: ', rowId),
  },
];
