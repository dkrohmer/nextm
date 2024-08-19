import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Segment } from 'semantic-ui-react';
import { RootState } from '../../store';
import IncrementsModal from './Modal';
import useFetchProductAndIncrements from '../../hooks/useFetchIncrements';
import useSetActiveIncrement from '../../hooks/useSetActiveIncrement';
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
   * global states
   */
  const {
    increments,
    incrementsError,
    incrementsIsLoading,
    incrementsIsLoaded,
  } = useSelector((state: RootState) => state.increments);

  const { product } = useSelector((state: RootState) => state.products);

  /**
   * hooks
   */
  const { productId, incrementId } = useParams<{ productId: string; incrementId?: string }>();
  useSetActiveIncrement(incrementsIsLoaded, increments, incrementId, productId);
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
        <Loader isLoading={incrementsIsLoading} />
        <Error error={incrementsError} />
        {!incrementsError && !incrementsIsLoading && increments.length === 0 && <Empty />}
        {!incrementsError && !incrementsIsLoading && increments.length > 0 && product && (
          <Accordion product={product}/>
        )}
      </Segment>
      <IncrementsModal />
      <ConfirmDelete />
    </div>
  );
};

export default Increments;
