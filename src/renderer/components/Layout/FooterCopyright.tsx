import React from 'react';
import { List } from 'semantic-ui-react';

const authorUrl = process.env.APP_AUTHOR_URL;
const authorName = process.env.APP_AUTHOR_NAME;
const year = process.env.APP_YEAR;

const FooterCopyright: React.FC = () => {
  /**
   * tsx
   */
  return (
    <List.Item
      as="a"
      href={authorUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="footer-text"
    >
      © {year}. {authorName}
    </List.Item>
  );
};

export default FooterCopyright;
