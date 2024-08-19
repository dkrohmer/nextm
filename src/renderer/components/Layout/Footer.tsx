import React from 'react';
import { Container, Grid, List, Segment } from 'semantic-ui-react';
import FooterContribute from './FooterContribute';
import FooterDiscuss from './FooterDiscuss';
import FooterDonate from './FooterDonate';
import FooterToolInfo from './FooterToolInfo';
import FooterCopyright from './FooterCopyright';
import FooterLicensing from './FooterLicensing';
import '../../styles/layout/footer.css'

const Footer: React.FC = () => {
  /**
   * tsx
   */
  return (
    <Segment inverted vertical className="footer">
      <Container textAlign="center">
        <Grid centered stackable>
          <Grid.Column width={3} textAlign="center">
            <FooterContribute />
          </Grid.Column>
          <Grid.Column width={3} textAlign="center">
            <FooterDiscuss />
          </Grid.Column>
          <Grid.Column width={3} textAlign="center">
            <FooterDonate />
          </Grid.Column>
        </Grid>

        <List horizontal inverted divided size="small">
          <FooterToolInfo />
          <FooterCopyright />
          <FooterLicensing />
        </List>
      </Container>
    </Segment>
  )
}

export default Footer;
