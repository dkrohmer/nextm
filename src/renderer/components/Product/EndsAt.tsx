import React from 'react';
import { Grid } from 'semantic-ui-react';

interface EndsAtProps {
  endsAt: string | null | undefined;
}

const EndsAt: React.FC<EndsAtProps> = ({ endsAt }) => (
  <Grid.Row className="product-row">
    <Grid.Column width={4} textAlign="right">
      <strong>Ends At:</strong>
    </Grid.Column>
    <Grid.Column width={12}>
      {endsAt ? new Date(endsAt).toLocaleDateString() : 'n/a'}
    </Grid.Column>
  </Grid.Row>
);

export default EndsAt;
