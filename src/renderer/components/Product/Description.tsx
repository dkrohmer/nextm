import React from 'react';
import { Grid } from 'semantic-ui-react';

interface DescriptionProps {
  description: string | null | undefined;
}

const Description: React.FC<DescriptionProps> = ({ description }) => (
  <Grid.Row className="product-row">
    <Grid.Column width={4} textAlign="right">
      <strong>Description:</strong>
    </Grid.Column>
    <Grid.Column width={12}>
      {description || 'n/a'}
    </Grid.Column>
  </Grid.Row>
);

export default Description;
