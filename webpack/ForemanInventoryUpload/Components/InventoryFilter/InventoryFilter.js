import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { FormGroup, FormControl } from 'patternfly-react';
import { noop } from 'foremanReact/common/helpers';
import { useForemanOrganization } from 'foremanReact/Root/Context/ForemanContext';
import { translate as __ } from 'foremanReact/common/I18n';
import ClearButton from './Components/ClearButton';
import './inventoryFilter.scss';
import { ANY_ORGANIZATION } from './InventoryFilterConstants';

const InventoryFilter = ({
  handleFilterChange,
  handleFilterClear,
  filterTerm,
}) => {
  const currentOrg = useForemanOrganization()?.title;

  useEffect(() => {
    const initialTerm = currentOrg === __(ANY_ORGANIZATION) ? '' : currentOrg;
    handleFilterChange(initialTerm);
  }, []);

  return (
    <form id="inventory_filter_form">
      <FormGroup controlId="inventory_filter_input">
        <FormControl
          value={filterTerm}
          type="text"
          placeholder={__('Filter..')}
          bsSize="lg"
          onChange={e => handleFilterChange(e.target.value)}
        />
        <ClearButton onClear={handleFilterClear} />
      </FormGroup>
    </form>
  );
};

InventoryFilter.propTypes = {
  handleFilterChange: PropTypes.func,
  handleFilterClear: PropTypes.func,
  filterTerm: PropTypes.string,
};

InventoryFilter.defaultProps = {
  handleFilterChange: noop,
  handleFilterClear: noop,
  filterTerm: '',
};

export default InventoryFilter;
