import React from 'react';
import { List } from 'semantic-ui-react';

const appName = process.env.APP_NAME;
const appVersion = process.env.APP_VERSION;

const FooterToolInfo: React.FC = () => (
  <List.Item>
    {appName} {appVersion}
  </List.Item>
);

export default FooterToolInfo;
