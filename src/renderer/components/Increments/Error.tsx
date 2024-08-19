import React from 'react';
import { Message } from 'semantic-ui-react';

interface IncrementsErrorProps {
  error: string | null;
}

const Error: React.FC<IncrementsErrorProps> = ({ error }) => {
  /**
   * tsx
   */
  return (
    error ? (
      <Message negative className="increments-message">
        <Message.Header>Error❗️</Message.Header>
        <p>{error}</p>
      </Message>
    ) : null
  )
}

export default Error;
