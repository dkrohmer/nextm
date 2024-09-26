import React from 'react';
import { useSelector } from 'react-redux';
import { Message } from 'semantic-ui-react';
import { RootState } from '../../store';

const Error: React.FC = () => {
  /**
   * global states
   */
  const { modelsError } = useSelector((state: RootState) => state.models);

  /**
   * tsx
   */
  return modelsError ? (
    <Message negative className="models-message" data-testid="models-error">
      <Message.Header>Error❗️</Message.Header>
      <p>{modelsError}</p>
    </Message>
  ) : null;
};

export default Error;
