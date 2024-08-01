import React from 'react';
import { List } from 'semantic-ui-react';

const toolName = "nexTM";
const toolVersion = "v0.1.0";

const FooterToolInfo: React.FC = () => (
  <List.Item>
    {toolName} {toolVersion}
  </List.Item>
);

export default FooterToolInfo;
