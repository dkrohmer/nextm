import React from 'react';
import { Icon, List } from 'semantic-ui-react';

const patreonUser = "https://patreon.com";

const FooterDonate: React.FC = () => (
  <div className="footer-flex">
    <a href={patreonUser} target="_blank" rel="noopener noreferrer">
      <Icon name="patreon" size="large" />
      <List.Item as="h5" content="Donate" className='footer-list-item' />
    </a>
  </div>
);

export default FooterDonate;
