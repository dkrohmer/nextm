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
  const { product, productIsLoading, productError } = useSelector(
    (state: RootState) => state.products,
  );

  useFetchProduct();

  return (
    <Container className="product-container">
      <Breadcrumbs product={product} />
      <Segment basic>
        <Segment className="product-segment">
          <Loader productIsLoading={productIsLoading} />
          <Error productError={productError} />

          {!productError && !productIsLoading && product && (
            <Grid columns={2}>
              <Description description={product.description ?? null} />
              <Responsibles responsibles={product.responsibles} />
              <StartsAt startsAt={product.startsAt ?? null} />
              <EndsAt endsAt={product.endsAt ?? null} />
              <CreatedAt createdAt={product.createdAt ?? null} />
            </Grid>
          )}
        </Segment>
      </Segment>

      <Increments />
    </Container>
  );
};

export default Product;
