import React from 'react';
import { Container, Grid, Icon, List, Segment } from 'semantic-ui-react';

const textStyle = {
  color: '#d3d3d3',
}; // Common text style

const flexStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const Footer: React.FC = () => (
  <Segment inverted vertical style={{ padding: '1em 0em', fontSize: 'small' }}>
    <Container textAlign="center">
      <Grid centered stackable>
        <Grid.Column width={3} textAlign="center">
          <a
            href="https://github.com/dkrohmer/"
            target="_blank"
            rel="noopener noreferrer"
            style={{ ...flexStyle }}
          >
            <Icon name="github" size="large" />
            <List.Item as="h5" content="Contribute" style={{ margin: 0 }} />
          </a>
        </Grid.Column>
        <Grid.Column width={3} textAlign="center">
          <a
            href="https://discord.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{ ...flexStyle }}
          >
            <Icon name="discord" size="large" />
            <List.Item as="h5" content="Discuss" style={{ margin: 0 }} />
          </a>
        </Grid.Column>
        <Grid.Column width={3} textAlign="center">
          <a
            href="https://patreon.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{ ...flexStyle }}
          >
            <Icon name="patreon" size="large" />
            <List.Item as="h5" content="Donate" style={{ margin: 0 }} />
          </a>
        </Grid.Column>
      </Grid>

      <List horizontal inverted divided size="small">
        <List.Item>nexTM v0.1.0</List.Item>
        <List.Item
          as="a"
          href="https://github.com/dkrohmer"
          target="_blank"
          rel="noopener noreferrer"
          style={{ textStyle }}
        >
          © 2024. Daniel Krohmer
        </List.Item>
        <List.Item
          as="a"
          href="https://www.gnu.org/licenses/agpl-3.0.txt"
          target="_blank"
          rel="noopener noreferrer"
          style={{ textStyle }}
        >
          AGPL v3.0
        </List.Item>
      </List>
    </Container>
  </Segment>
);

export default Footer;
