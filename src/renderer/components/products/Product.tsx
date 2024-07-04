import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Breadcrumb,
  Container,
  Dimmer,
  Grid,
  Icon,
  Label,
  Loader,
  Message,
  Segment,
} from 'semantic-ui-react';
import { useSelector, useDispatch } from 'react-redux';

import { RootState, AppDispatch } from '../../store';
import { fetchProduct } from '../../store/ProductsStore'; // Import the fetchProduct thunk

import Increments from '../increments/Increments';

const Product: React.FC = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  // global redux states
  const { product, productIsLoading, productError } = useSelector(
    (state: RootState) => state.products,
  );

  useEffect(() => {
    if (productId) {
      dispatch(fetchProduct({ productId, isEagerLoading: false }));
    }
  }, [productId, dispatch]);

  return (
    <Container style={{ marginTop: '5em' }}>
      <Breadcrumb>
        <Breadcrumb.Section link onClick={() => navigate(`/products`)}>
          Products
        </Breadcrumb.Section>
        <Breadcrumb.Divider icon="right chevron" />
        <Breadcrumb.Section active>
          {product ? product.name : 'Loading...'}
        </Breadcrumb.Section>
      </Breadcrumb>

      <Segment basic>
        <Segment style={{ minHeight: '150px' }}>
          <Dimmer active={productIsLoading} inverted>
            <Loader>Loading Product...</Loader>
          </Dimmer>

          {/* Error handling */}
          {productError && (
            <Message negative style={{ textAlign: 'center' }}>
              <Message.Header>Error❗️</Message.Header>
              <p>{productError}</p>
            </Message>
          )}

          {/* Normal behavior */}
          {!productError && !productIsLoading && product && (
            <Grid columns={2}>
              <Grid.Row style={{ paddingBottom: '0px' }}>
                <Grid.Column width={4} textAlign="right">
                  <strong>Description:</strong>
                </Grid.Column>
                <Grid.Column width={12}>
                  {product.description || 'n/a'}
                </Grid.Column>
              </Grid.Row>
              <Grid.Row style={{ paddingBottom: '0px' }}>
                <Grid.Column width={4} textAlign="right">
                  <strong>Responsible(s):</strong>
                </Grid.Column>
                <Grid.Column width={12}>
                  {product.responsibles && product.responsibles.length > 0
                    ? product.responsibles.map((resp, _index) => (
                        <Label
                          key={resp.id}
                          size="tiny"
                          style={{ margin: '2px' }}
                        >
                          <Icon name="user" />
                          {`${resp.firstName} ${resp.lastName}${resp.role ? ` (${resp.role})` : ''}`}
                        </Label>
                      ))
                    : 'n/a'}
                </Grid.Column>
              </Grid.Row>
              <Grid.Row style={{ paddingBottom: '0px' }}>
                <Grid.Column width={4} textAlign="right">
                  <strong>Starts At:</strong>
                </Grid.Column>
                <Grid.Column width={12}>
                  {product.startsAt
                    ? new Date(product.startsAt).toLocaleDateString()
                    : 'n/a'}
                </Grid.Column>
              </Grid.Row>
              <Grid.Row style={{ paddingBottom: '0px' }}>
                <Grid.Column width={4} textAlign="right">
                  <strong>Ends At:</strong>
                </Grid.Column>
                <Grid.Column width={12}>
                  {product.endsAt
                    ? new Date(product.endsAt).toLocaleDateString()
                    : 'n/a'}
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column width={4} textAlign="right">
                  <strong>Created At:</strong>
                </Grid.Column>
                <Grid.Column width={12}>
                  {product.createdAt
                    ? new Date(product.createdAt).toLocaleString()
                    : 'n/a'}
                </Grid.Column>
              </Grid.Row>
            </Grid>
          )}
        </Segment>
      </Segment>

      {/* Load increments */}
      {/* {product && <Increments {...product} />} */}
      <Increments />
    </Container>
  );
};

export default Product;
