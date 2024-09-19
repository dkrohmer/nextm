import React from 'react';
import { useSelector } from 'react-redux';
import { Container, Segment, Grid } from 'semantic-ui-react';
import { RootState } from '../../store';
import useFetchProduct from '../../hooks/useFetchProduct';
import Breadcrumbs from './Breadcrumbs';
import Loader from './Loader';
import Error from './Error';
import Description from './Description';
import Responsibles from './Responsibles';
import StartsAt from './StartsAt';
import EndsAt from './EndsAt';
import CreatedAt from './CreatedAt';
import Increments from "../Increments"
import '../../styles/product.css';

const Product: React.FC = () => {
  /**
   * global states
   */
  const { product, productIsLoading, productError } = useSelector(
    (state: RootState) => state.products,
  );

  /**
   * hooks
   */
  useFetchProduct();

  /**
   * tsx
   */
  return (
    <Container className="product-container">
      <Breadcrumbs />
      <Segment basic>
        <Segment className="product-segment">
          <Loader />
          <Error />

          {!productError && !productIsLoading && product && (
            <Grid columns={2}>
              <Description />
              <Responsibles />
              <StartsAt />
              <EndsAt />
              <CreatedAt />
            </Grid>
          )}
        </Segment>
      </Segment>

      <Increments />
    </Container>
  );
};

export default Product;
