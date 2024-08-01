import React from 'react';
import { Icon, List } from 'semantic-ui-react';

const discordUser = "https://discord.com";

const FooterDiscuss: React.FC = () => (
  <div className="footer-flex">
    <a href={discordUser} target="_blank" rel="noopener noreferrer">
      <Icon name="discord" size="large" />
      <List.Item as="h5" content="Discuss" className='footer-list-item' />
    </a>
  </div>
);

export default FooterDiscuss;
