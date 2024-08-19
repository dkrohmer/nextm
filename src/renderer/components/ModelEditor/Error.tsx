import React from 'react';
import { Message } from 'semantic-ui-react';

interface ErrorProps {
  errors: (string | null)[];
}

const Error: React.FC<ErrorProps> = ({ errors }) => {

  /**
   * handlers
   */
  const hasErrors = () => {
    if (errors.some(error => error)) {
      return true;
    } else {
      return false;
    }
  }

  /**
   * tsx
   */
  return (
    hasErrors() ? (
      <Message negative style={{ textAlign: 'center' }}>
        <Message.Header>Error</Message.Header>
        {errors.map((error, index) => error && <p key={index}>{error}</p>)}
      </Message>
    ) : null
  );
};

export default Error;
