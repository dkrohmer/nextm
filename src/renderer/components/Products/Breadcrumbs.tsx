import React from 'react';
import { Breadcrumb } from 'semantic-ui-react';

const Breadcrumbs: React.FC = () => (
  <Breadcrumb className="products-breadcrumb">
    <Breadcrumb.Section active>Products</Breadcrumb.Section>
  </Breadcrumb>
);

export default Breadcrumbs;