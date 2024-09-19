import React from 'react';
import { Segment } from 'semantic-ui-react';
import IncrementsModal from './Modal';
import useFetchProductAndIncrements from '../../hooks/useFetchIncrements';
import Loader from './Loader';
import Error from './Error';
import Empty from './Empty';
import ConfirmDelete from './ConfirmDelete';
import Accordion from './Accordion';
import Title from './Title';
import '../../styles/increments.css';
import Add from './Add';

const Increments: React.FC = () => {
  /**
   * hooks
   */

  useFetchProductAndIncrements();

  /**
   * tsx
   */
  return (
    <div>
      <div className="increments-header-container">
        <Title />
        <Add />
      </div>
      <Segment basic className="increments-segment">
        <Loader/>
        <Error />
        <Empty />
        <Accordion />
      </Segment>
      <IncrementsModal />
      <ConfirmDelete />
    </div>
  );
};

export default Increments;
