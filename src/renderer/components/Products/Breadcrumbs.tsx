import React from 'react';
import { Breadcrumb } from 'semantic-ui-react';

const Breadcrumbs: React.FC = () => {
  /**
   * tsx
   */
  return (
    <Breadcrumb className="products-breadcrumb" data-testid="breadcrumb">
      <Breadcrumb.Section active data-testid="breadcrumb-section">
        Products
      </Breadcrumb.Section>
    </Breadcrumb>
  );
};

export default Breadcrumbs;
