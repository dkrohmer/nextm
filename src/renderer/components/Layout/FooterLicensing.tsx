import React from 'react';
import { List } from 'semantic-ui-react';

const license = process.env.APP_LICENSE;
const licenseUrl = process.env.APP_LICENSE_URL;

const FooterLicensing: React.FC = () => {
  /**
   * tsx
   */
  return (
    <List.Item as="a" href={licenseUrl} target="_blank" rel="noopener noreferrer" className="footer-text">
      {license}
    </List.Item>
  )
}

export default FooterLicensing;
