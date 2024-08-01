import React from 'react';
import { List } from 'semantic-ui-react';

const license = "AGPL v3.0";
const licenseUrl = "https://www.gnu.org/licenses/agpl-3.0.txt";

const FooterLicensing: React.FC = () => (
  <List.Item as="a" href={licenseUrl} target="_blank" rel="noopener noreferrer" className="footer-text">
    {license}
  </List.Item>
);

export default FooterLicensing;
