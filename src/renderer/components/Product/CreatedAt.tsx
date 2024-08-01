import React from 'react';
import { Grid } from 'semantic-ui-react';

interface CreatedAtProps {
  createdAt: string | null;
}

const CreatedAt: React.FC<CreatedAtProps> = ({ createdAt }) => (
  <Grid.Row className="product-row">
    <Grid.Column width={4} textAlign="right">
      <strong>Created At:</strong>
    </Grid.Column>
    <Grid.Column width={12}>
      {createdAt ? new Date(createdAt).toLocaleString() : 'n/a'}
    </Grid.Column>
  </Grid.Row>
);

export default CreatedAt;
