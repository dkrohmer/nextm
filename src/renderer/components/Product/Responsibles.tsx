import React from 'react';
import { Grid, Label, Icon } from 'semantic-ui-react';
import { IResponsible } from '../../interfaces/IResponsible';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

const Responsibles: React.FC = () => {
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
        <strong>Responsible(s):</strong>
      </Grid.Column>
      <Grid.Column width={12}>
        {product?.responsibles && product?.responsibles.length > 0
          ? product.responsibles.map((resp) => (
              <Label key={resp.id} size="tiny" className="product-label">
                <Icon name="user" />
                {`${resp.firstName} ${resp.lastName}${resp.role ? ` (${resp.role})` : ''}`}
              </Label>
            ))
          : 'n/a'}
      </Grid.Column>
    </Grid.Row>
  )
}

export default Responsibles;
