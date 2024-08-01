import { NavigateFunction } from 'react-router-dom';
import { InputOnChangeData } from 'semantic-ui-react';
import { AppDispatch } from '../store';
import { IIncrement } from '../interfaces/IIncrement';
import { deleteIncrement, fetchIncrement, addOrUpdateIncrement } from '../services/api/increments';
import {
  setIncrementsActiveIndex,
  setIncrementsModalOpen,
  setIncrementsIsEditing,
  setCurrentIncrement,
  setIncrementsIsCloning,
} from '../store/increments';

// Accordion handlers
export const handleAccordionClick = (
  index: number,
  increments: IIncrement[],
  incrementsActiveIndex: number,
  productId: string,
  dispatch: AppDispatch,
  navigate: NavigateFunction,
) => {
  const increment = increments[index];
  if (index === incrementsActiveIndex) {
    dispatch(setIncrementsActiveIndex(-1));
    navigate(`/products/${productId}`);
  } else {
    navigate(`/products/${productId}/increments/${increment.id}`);
    dispatch(setIncrementsActiveIndex(index));
  }
};

export const openAddModal = (dispatch: AppDispatch) => {
  dispatch(setIncrementsIsEditing(false));
  dispatch(setIncrementsModalOpen(true));
  dispatch(
    setCurrentIncrement({
      id: '',
      name: '',
      start: '',
      end: '',
      deadline: '',
      state: '',
      productId: '',
      models: [],
    }),
  );
};

export const confirmDelete = (
  incrementToDelete: string | null,
  dispatch: AppDispatch,
  productId: string,
  navigate: NavigateFunction,
) => {
  if (incrementToDelete) {
    dispatch(deleteIncrement(incrementToDelete));
    navigate(`/products/${productId}/`);
    dispatch(setIncrementsActiveIndex(-1));
  }
};

// Modal handlers
export const handleInputChange = (
  data: InputOnChangeData,
  currentIncrement: IIncrement | null,
  dispatch: AppDispatch,
) => {
  if (currentIncrement) {
    dispatch(
      setCurrentIncrement({ ...currentIncrement, [data.name]: data.value }),
    );
  }
};

export const handleClose = (dispatch: AppDispatch) => {
  dispatch(setIncrementsModalOpen(false));
  dispatch(setCurrentIncrement(null));
  dispatch(setIncrementsIsCloning(false));
  dispatch(setIncrementsIsEditing(false));
};

export const handleSubmit = async (
  currentIncrement: IIncrement | null,
  incrementsIsCloning: boolean,
  productId: string | undefined,
  dispatch: AppDispatch,
  navigate: Function,
) => {
  if (currentIncrement && productId) {
    let increment: IIncrement;

    if (incrementsIsCloning) {
      const cloneResponse = await dispatch(
        fetchIncrement({
          incrementId: currentIncrement.id,
          isEagerLoading: true,
        }),
      );
      if (fetchIncrement.fulfilled.match(cloneResponse)) {
        const eagerIncrement: IIncrement = cloneResponse.payload;
        increment = {
          ...eagerIncrement,
          id: '',
          name: `${currentIncrement.name}`,
        };
      } else {
        console.error('Cloning failed');
        return;
      }
    } else {
      increment = currentIncrement;
    }

    const response = await dispatch(
      addOrUpdateIncrement({ increment, productId }),
    );
    if (addOrUpdateIncrement.fulfilled.match(response)) {
      const responseIncrement: IIncrement = response.payload;
      navigate(`/products/${productId}/increments/${responseIncrement.id}`);
    }
  }
  handleClose(dispatch);
};

export const getModalHeader = (
  incrementsIsCloning: boolean,
  incrementsIsEditing: boolean,
) => (incrementsIsCloning
  ? 'Clone Increment'
  : incrementsIsEditing
    ? 'Edit Increment'
    : 'Add Increment'
);

export const getSubmitButtonText = (
  incrementsIsCloning: boolean,
  incrementsIsEditing: boolean,
) => (incrementsIsCloning
  ? 'Clone'
  : incrementsIsEditing
    ? 'Edit'
    : 'Add'
);
