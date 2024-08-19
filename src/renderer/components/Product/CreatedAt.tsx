import React from 'react';
import { useSelector } from 'react-redux';
import { Grid } from 'semantic-ui-react';
import { RootState } from '../../store';

const CreatedAt: React.FC = () => {
  /**
   * global states
   */
  const { product } = useSelector((state: RootState) => state.products);

  /**
   * tsx
   */
  return (
    <Grid.Row className="product-row">
      <Grid.Column width={4} textAlign="right">
        <strong>Created At:</strong>
      </Grid.Column>
      <Grid.Column width={12}>
        {product?.createdAt ? new Date(product?.createdAt).toLocaleString() : 'n/a'}
      </Grid.Column>
    </Grid.Row>
  )
}

export default CreatedAt;
