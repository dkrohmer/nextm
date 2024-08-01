import React from 'react';
import { Message } from 'semantic-ui-react';

interface ErrorProps {
  error: string | null;
}

const Error: React.FC<ErrorProps> = ({ error }) => (
  error ? (
    <Message negative className="models-message">
      <Message.Header>Error❗️</Message.Header>
      <p>{error}</p>
    </Message>
  ) : null
);

export default Error;
