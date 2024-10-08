import React from 'react';
import { IIncrement } from '../../interfaces/IIncrement';
import ActionsEdit from './ActionsEdit';
import ActionsClone from './ActionsClone';
import ActionsDelete from './ActionsDelete';

interface ActionsProps {
  increment: IIncrement;
  number: number;
  isHovering: boolean;
}

const Actions: React.FC<ActionsProps> = ({ increment, number, isHovering }) => {
  /**
   * tsx
   */
  return (
    <div
      className={`increment-actions ${isHovering ? 'visible' : ''}`}
      data-testid="actions-container"
    >
      <ActionsEdit increment={increment} number={number} />
      <ActionsClone increment={increment} number={number} />
      <ActionsDelete increment={increment} number={number} />
    </div>
  );
};

export default Actions;
