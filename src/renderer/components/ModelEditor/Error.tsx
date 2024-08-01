import React from 'react';
import { Message } from 'semantic-ui-react';

interface ErrorProps {
  errors: (string | null)[];
}

const Error: React.FC<ErrorProps> = ({ errors }) => {
  const hasErrors = errors.some(error => error);

  if (!hasErrors) return null;

  return (
    <Message negative style={{ textAlign: 'center' }}>
      <Message.Header>Error</Message.Header>
      {errors.map((error, index) => error && <p key={index}>{error}</p>)}
    </Message>
  );
};

export default Error;
