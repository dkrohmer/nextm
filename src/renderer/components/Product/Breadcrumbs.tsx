import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Breadcrumb } from 'semantic-ui-react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import '../../styles/product.css'

const Breadcrumbs: React.FC = () => {
  /**
   * global states
   */
  const { product } = useSelector((state: RootState) => state.products);

  /**
   * hooks
   */
  const navigate = useNavigate();

  /**
   * tsx
   */
  return (
    <Breadcrumb>
      <Breadcrumb.Section link onClick={() => navigate('/products')}>
        Products
      </Breadcrumb.Section>
      <Breadcrumb.Divider icon="right chevron" />
      <Breadcrumb.Section active className="product-breadcrumb-name">
        {product ? product.name : 'Loading...'}
      </Breadcrumb.Section>
    </Breadcrumb>
  );
};

export default Breadcrumbs;
