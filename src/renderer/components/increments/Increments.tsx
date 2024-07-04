import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../store';
import {
  Accordion, 
  Button, 
  Confirm,
  Dimmer,
  Header, 
  Label,
  Message,
  Loader,
  Segment
} from 'semantic-ui-react';

import Increment from './Increment';
import IncrementsModal from './IncrementsModal';

import { 
  fetchIncrements,
  setIncrementsActiveIndex,
  setIncrementsModalOpen,
  setIncrementsIsEditing,
  setCurrentIncrement,
  setIncrementsConfirmOpen,
  deleteIncrement 
} from '../../store/IncrementsStore';
import { fetchProduct } from '../../store/ProductsStore';

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
    incrementToDelete
  } = useSelector((state: RootState) => state.increments);

  const {
    product
  } = useSelector((state: RootState) => state.products)

  //todo: direct access to increment via products/:id/increments/:id does not work yet
  useEffect(() => {
    if (productId) {
      dispatch(setIncrementsActiveIndex(-1));
      dispatch(fetchProduct({ productId, isEagerLoading: false }));
      dispatch(fetchIncrements({ productId }))
    }
  }, [productId, dispatch]);

  useEffect(() => {
    if (incrementsIsLoaded && increments.length > 0) {
      if (incrementId) {
        const index = increments.findIndex(inc => inc.id === incrementId);
        if (index !== -1) {
          dispatch(setIncrementsActiveIndex(index));
          // navigate(`/products/${productId}/increments/${increments[index].id}`);
        }
        // } else {
        //   dispatch(setIncrementsActiveIndex(0));
        // }
      } else {
        dispatch(setIncrementsActiveIndex(-1));

        // navigate(`/products/${productId}`);
      }
    }

  }, [incrementsIsLoaded, incrementId, increments, dispatch]);

  const handleAccordionClick = (index: number) => {
    const increment = increments[index];

    if (index === incrementsActiveIndex) {
      dispatch(setIncrementsActiveIndex(-1));
      navigate(`/products/${productId}`);
    } else {
      navigate(`/products/${productId}/increments/${increment.id}`);
      dispatch(setIncrementsActiveIndex(index));
    }
  };

  const openAddModal = () => {
    dispatch(setIncrementsIsEditing(false));
    dispatch(setIncrementsModalOpen(true));
    dispatch(setCurrentIncrement({
      id: '',
      name: '',
      start: '',
      end: '',
      deadline: '',
      state: '',
      productId: '',
      models: []
    }));
  };

  const confirmDelete = () => {
    if (incrementToDelete) {
      dispatch(deleteIncrement(incrementToDelete));
      navigate(`/products/${productId}/`);
      dispatch(setIncrementsActiveIndex(-1));
    }
  };

  return (
    <div>
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
          <div style={{ flex: 1 }}>
            <Header as='h3' style={{ fontSize: '16px', marginBottom: 0 }}>Product Increments</Header>
          </div>
          <Button onClick={openAddModal} primary>
            + Add Increment
          </Button>
        </div>

        <Segment basic style={{ minHeight: '150px', paddingBottom: '50px'}}>

          {/* Loader */}
          <Dimmer active={incrementsIsLoading} inverted={true}>
            <Loader>Loading Increments...</Loader>
          </Dimmer>

          {/* Error handling */}
          {incrementsError && (
            <Message negative style={{textAlign: 'center'}}>
              <Message.Header>
                Error❗️
              </Message.Header>
              <p>
                {incrementsError}
              </p>
            </Message>
          )}

          {/* Normal behavior */}
          {!incrementsError && !incrementsIsLoading && increments && product && (
            // <Segment basic>
              <Accordion fluid styled>
                {increments.length > 0 ? (
                  increments.map((increment, index) => (
                    <Increment
                      key={increment.id}
                      product={product}
                      increment={increment}
                      index={index}
                      number={increments.length - index - 1}
                      isActive={incrementsActiveIndex === index}
                      handleAccordionClick={() => handleAccordionClick(index)}
                    />
                  ))
                ) : (
                  <div>
                    <h3 className='empty-message-header'>
                      Increments, anyone? 👀
                    </h3>
                    <div className='empty-message-body'>
                    You are just one click away: <Label>+ Add increment</Label>
                    </div> 
                  </div>
                )}   
              </Accordion>
            // </Segment>
            
          )}
          
        </Segment>

        <IncrementsModal />
        
        <Confirm
          open={incrementsConfirmOpen}
          onCancel={() => dispatch(setIncrementsConfirmOpen(false))}
          onConfirm={confirmDelete}
          content="Deleting an increment will permanently delete all models associated with it. Do you want to delete this increment?"
        />
      </div>
    </div>
  );
}

export default Increments;
