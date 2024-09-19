import React from 'react';
import { Icon, List } from 'semantic-ui-react';

const discord = process.env.APP_DISCORD;

const FooterDiscuss: React.FC = () => {
  return (
    <div className="footer-flex">
      <a 
        href={discord} 
        target="_blank" 
        rel="noopener noreferrer"
        data-testid="footer-discuss-link"
      >
        <Icon name="discord" size="large" data-testid="footer-discuss-icon" />
        <List.Item as="h5" content="Discuss" className="footer-list-item" data-testid="footer-discuss-item" />
      </a>
    </div>
  );
};

export default FooterDiscuss;
