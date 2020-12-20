import React from 'react';
import {
  Alert,
  AlertActionCloseButton,
  AlertActionLink,
} from '@patternfly/react-core';

export default ({ selectedIds, itemCount, showSelectAllAlert }) => {
  if (!showSelectAllAlert) return null;
  const selectedCount = Object.keys(selectedIds).length;
  if (!selectedCount) return null;
  if (itemCount > selectedCount) {
    return (
      <Alert
        isInline
        variant="info"
        title={`All ${selectedCount} recommendations on this page are selected.`}
        actionClose={
          <AlertActionCloseButton
            onClose={() => alert('Clicked the close button')}
          />
        }
        actionLinks={
          <React.Fragment>
            <AlertActionLink onClick={() => alert('Clicked on View details')}>
              Select all {itemCount} recommendations
            </AlertActionLink>
          </React.Fragment>
        }
      />
    );
  }
  return null;
};
