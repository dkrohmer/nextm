import React from 'react';
import ActionsEdit from './ActionsEdit';
import ActionsClone from './ActionsClone';
import ActionsDelete from './ActionsDelete';
import { IIncrement } from '../../interfaces/IIncrement';

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
    <div className={`increment-actions ${isHovering ? 'visible' : ''}`}>
      <ActionsEdit increment={increment} number={number} />
      <ActionsClone increment={increment} number={number} />
      <ActionsDelete increment={increment} number={number} />
    </div>
  )
}


export default Actions;
