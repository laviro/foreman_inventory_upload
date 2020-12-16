import React from 'react';
import { Battery, Section } from '@redhat-cloud-services/frontend-components';
import './table.scss';

export default value => (
  <Section className="insights-total-risk" type="icon-group">
    <Battery label="total_risk" labelHidden severity={value} />
  </Section>
);
