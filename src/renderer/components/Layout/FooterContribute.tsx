import React from 'react';
import { Icon, List } from 'semantic-ui-react';

const github = process.env.APP_GITHUB;

const FooterContribute: React.FC = () => (
  <div className="footer-flex">
    <a href={github} target="_blank" rel="noopener noreferrer">
      <Icon name="github" size="large" />
      <List.Item as="h5" content="Contribute" className='footer-list-item' />
    </a>
  </div>
);

export default FooterContribute;
