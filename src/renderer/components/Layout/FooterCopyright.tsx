import React from 'react';
import { List } from 'semantic-ui-react';

const githubUser = "https://github.com/dkrohmer/";
const year = "2024";
const firstName = "Daniel";
const lastName = "Krohmer";

const FooterCopyright: React.FC = () => (
  <List.Item as="a" href={githubUser} target="_blank" rel="noopener noreferrer" className="footer-text">
    © {year}. {firstName} {lastName}
  </List.Item>
);

export default FooterCopyright;
