import React from 'react';
import { Grid, Label, Icon } from 'semantic-ui-react';
import { IResponsible } from '../../interfaces/IResponsible';

interface ResponsiblesProps {
  responsibles: IResponsible[] | undefined;
}

const Responsibles: React.FC<ResponsiblesProps> = ({ responsibles }) => (
  <Grid.Row className="product-row">
    <Grid.Column width={4} textAlign="right">
      <strong>Responsible(s):</strong>
    </Grid.Column>
    <Grid.Column width={12}>
      {responsibles && responsibles.length > 0
        ? responsibles.map((resp) => (
            <Label key={resp.id} size="tiny" className="product-label">
              <Icon name="user" />
              {`${resp.firstName} ${resp.lastName}${resp.role ? ` (${resp.role})` : ''}`}
            </Label>
          ))
        : 'n/a'}
    </Grid.Column>
  </Grid.Row>
);

export default Responsibles;
