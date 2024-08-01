import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Segment } from 'semantic-ui-react';
import { RootState, AppDispatch } from '../../store';
import { confirmDelete } from '../../utils/incrementsHandlers';
import { setIncrementsConfirmOpen } from '../../store/increments';
import IncrementsModal from './Modal';
import useFetchProductAndIncrements from '../../hooks/useFetchProductAndIncrements';
import useSetActiveIncrement from '../../hooks/useSetActiveIncrement';
import Loader from './Loader';
import Error from './Error';
import Empty from './Empty';
import ConfirmDelete from './ConfirmDelete';
import Accordion from './Accordion';
import Title from './Title';
import '../../styles/increments.css';

const Increments: React.FC = () => {
  const { productId, incrementId } = useParams<{ productId: string; incrementId?: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const {
    increments,
    incrementsActiveIndex,
    incrementsError,
    incrementsIsLoading,
    incrementsIsLoaded,
    incrementsConfirmOpen,
    incrementToDelete,
  } = useSelector((state: RootState) => state.increments);

  const { product } = useSelector((state: RootState) => state.products);

  useFetchProductAndIncrements(productId);
  useSetActiveIncrement(incrementsIsLoaded, increments, incrementId, productId);

  return (
    <div>
      <Title />
      <Segment basic className="increments-segment">
        <Loader isLoading={incrementsIsLoading} />
        <Error error={incrementsError} />
        {!incrementsError && !incrementsIsLoading && increments.length === 0 && <Empty />}
        {!incrementsError && !incrementsIsLoading && increments.length > 0 && product && (
          <Accordion
            increments={increments}
            incrementsActiveIndex={incrementsActiveIndex ?? null}
            product={product}
            dispatch={dispatch}
            productId={productId ?? ''}
            navigate={navigate}
          />
        )}
      </Segment>
      <IncrementsModal />
      <ConfirmDelete
        open={incrementsConfirmOpen}
        onCancel={() => dispatch(setIncrementsConfirmOpen(false))}
        onConfirm={() => confirmDelete(incrementToDelete, dispatch, productId ?? '', navigate)}
      />
    </div>
  );
};

export default Increments;
