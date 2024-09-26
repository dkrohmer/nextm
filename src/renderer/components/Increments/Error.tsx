import React from 'react';
import { useSelector } from 'react-redux';
import { Message } from 'semantic-ui-react';
import { RootState } from '../../store';

const Error: React.FC = () => {
  /**
   * global states
   */
  const { incrementsError } = useSelector(
    (state: RootState) => state.increments,
  );

  /**
   * tsx
   */
  return incrementsError ? (
    <Message
      negative
      className="increments-message"
      data-testid="increments-error"
    >
      <Message.Header>Error❗️</Message.Header>
      <p>{incrementsError}</p>
    </Message>
  ) : null;
};

export default Error;
