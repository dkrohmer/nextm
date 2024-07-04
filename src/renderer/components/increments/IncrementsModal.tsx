import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { RootState, AppDispatch } from '../../store';

import { useDispatch, useSelector } from 'react-redux';
import { Modal, Form, InputOnChangeData } from 'semantic-ui-react';
import { 
  setIncrementsModalOpen, 
  addOrUpdateIncrement,
  setCurrentIncrement,
  setIncrementsIsCloning,
  setIncrementsIsEditing,
  fetchIncrement
} from '../../store/IncrementsStore';

import { IIncrement } from '../../interfaces/IIncrement';

// const IncrementsModal: React.FC<IncrementsModalProps> = ({ productId }) => {
const IncrementsModal: React.FC = () => {

  const { productId } = useParams<{ productId: string }>();

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  // global redux states
  const { 
    incrementsModalOpen, 
    incrementsIsEditing,
    incrementsIsCloning,
    currentIncrement, 
  } = useSelector((state: RootState) => state.increments);

  // Updated to align with Semantic UI React's expected parameters for onChange
  const handleInputChange = (_e: React.ChangeEvent<HTMLInputElement>, data: InputOnChangeData) => {
    if (currentIncrement) {
      dispatch(setCurrentIncrement({ ...currentIncrement, [data.name]: data.value }));
    }
  };

  const handleSubmit = async () => {
    if (currentIncrement && productId) {
        let increment: IIncrement;

        if (incrementsIsCloning) {
            const cloneResponse = await dispatch(fetchIncrement({ incrementId: currentIncrement.id, isEagerLoading: true }));
            if (fetchIncrement.fulfilled.match(cloneResponse)) {
                const eagerIncrement: IIncrement = cloneResponse.payload;
                increment = { ...eagerIncrement, id: '', name: `${currentIncrement.name}` };
            } else {
                // Handle the case where cloning fails
                console.error("Cloning failed");
                return;
            }
        } else {
          increment = currentIncrement;
        }

        const response = await dispatch(addOrUpdateIncrement({ increment, productId }));
        if (addOrUpdateIncrement.fulfilled.match(response)) {
            const responseIncrement: IIncrement = response.payload;  // This now should be IIncrement
            navigate(`/products/${productId}/increments/${responseIncrement.id}`);
        }
    }
    handleClose();
};

  const handleClose = () => {
    dispatch(setIncrementsModalOpen(false));
    dispatch(setCurrentIncrement(null)); // Clear the increment to clone
    dispatch(setIncrementsIsCloning(false)); // Clear the increment to clone
    dispatch(setIncrementsIsEditing(false)); // Clear the increment to clone
  };

  const modalHeader = incrementsIsCloning ? 'Clone Increment' : incrementsIsEditing ? 'Edit Increment' : 'Add Increment';
  const submitButtonText = incrementsIsCloning ? 'Clone' : incrementsIsEditing ? 'Edit' : 'Add';

  return (
    <Modal open={incrementsModalOpen} onClose={() => dispatch(setIncrementsModalOpen(false))} dimmer="blurring">
      <Modal.Header>{modalHeader}</Modal.Header>
      <Modal.Content>
        <Form onSubmit={handleSubmit}>
          <Form.Input
            label="Name"
            placeholder="Increment Name"
            name="name"
            value={currentIncrement?.name || ''}
            autoFocus
            required
            onChange={handleInputChange}
          />
          {/* Additional form inputs here */}
          <Form.Group>
            <Form.Button primary type='submit'>{submitButtonText}</Form.Button>
            <Form.Button onClick={handleClose}>Cancel</Form.Button>
          </Form.Group>
        </Form>
      </Modal.Content>
    </Modal>
  );
};

export default IncrementsModal;
