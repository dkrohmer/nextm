import React from 'react';
import { Grid } from 'semantic-ui-react';

interface StartsAtProps {
  startsAt: string | null | undefined;
}

const StartsAt: React.FC<StartsAtProps> = ({ startsAt }) => (
  <Grid.Row className="product-row">
    <Grid.Column width={4} textAlign="right">
      <strong>Starts At:</strong>
    </Grid.Column>
    <Grid.Column width={12}>
      {startsAt ? new Date(startsAt).toLocaleDateString() : 'n/a'}
    </Grid.Column>
  </Grid.Row>
);

export default StartsAt;
