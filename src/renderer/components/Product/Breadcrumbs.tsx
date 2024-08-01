import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Breadcrumb } from 'semantic-ui-react';
import { IProduct } from '../../interfaces/IProduct';

interface BreadcrumbsProps {
  product: IProduct | null;
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ product }) => {
  const navigate = useNavigate();

  return (
    <Breadcrumb>
      <Breadcrumb.Section link onClick={() => navigate('/products')}>
        Products
      </Breadcrumb.Section>
      <Breadcrumb.Divider icon="right chevron" />
      <Breadcrumb.Section active>
        {product ? product.name : 'Loading...'}
      </Breadcrumb.Section>
    </Breadcrumb>
  );
};

export default Breadcrumbs;
