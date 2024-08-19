import React from 'react';
import { Icon, List } from 'semantic-ui-react';

const discord = process.env.APP_DISCORD;

const FooterDiscuss: React.FC = () => {
  /**
   * tsx
   */
  return (
    <div className="footer-flex">
      <a href={discord} target="_blank" rel="noopener noreferrer">
        <Icon name="discord" size="large" />
        <List.Item as="h5" content="Discuss" className='footer-list-item' />
      </a>
    </div>
  )
}

export default FooterDiscuss;
