import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import {
  Button,
  Confirm,
  Dimmer,
  Label,
  List,
  Loader,
  Message,
  Segment,
} from 'semantic-ui-react';

import { useSelector, useDispatch } from 'react-redux';
import { IModel } from '../../interfaces/IModel';
import { IProduct } from '../../interfaces/IProduct';
import { IIncrement } from '../../interfaces/IIncrement';

import ModelsModal from './ModelsModal';
import Model from './Model';

import { RootState, AppDispatch } from '../../store';

import {
  fetchModels,
  deleteModel,
  setModelsCurrentModel,
  setModelsModalOpen,
  setModelsIsEditing,
  setModelsConfirmOpen,
} from '../../store/ModelsStore';

interface ThreatModelsProps {
  product: IProduct;
  increment: IIncrement;
  number: number;
}

const ThreatModels: React.FC<ThreatModelsProps> = ({
  product,
  increment,
  number,
}) => {
  const { incrementId } = useParams<{ incrementId: string }>();
  const dispatch = useDispatch<AppDispatch>();

  // global redux states
  const {
    models,
    modelsError,
    modelsIsLoading,
    modelsConfirmOpen,
    modelToDelete,
  } = useSelector((state: RootState) => state.models);

  useEffect(() => {
    if (incrementId) {
      dispatch(fetchModels({ incrementId }));
    }
  }, [dispatch, incrementId]);

  const openAddModal = () => {
    dispatch(
      setModelsCurrentModel({
        id: '',
        name: '',
        createdAt: '',
        incrementId: '', // Assuming you have this in your form state
      }),
    );
    dispatch(setModelsModalOpen(true));
    dispatch(setModelsIsEditing(false));
  };

  const confirmDelete = () => {
    if (modelToDelete) {
      dispatch(deleteModel(modelToDelete));
    }
  };

  return (
    <div>
      <Segment basic style={{ minHeight: '100px' }}>
        {/* Loader */}
        <Dimmer active={modelsIsLoading} inverted>
          <Loader>Loading models...</Loader>
        </Dimmer>

        {/* Error handling */}
        {modelsError && (
          <Message negative style={{ textAlign: 'center' }}>
            <Message.Header>Error❗️</Message.Header>
            <p>{modelsError}</p>
          </Message>
        )}

        {/* No products available. */}
        {!modelsError && !modelsIsLoading && models && models.length <= 0 && (
          <div>
            <h3 className="empty-message-header">
              No threat models here yet 😔
            </h3>
            <div className="empty-message-body">
              Add one by clicking <Label>+ Add Threat Model</Label>
            </div>
          </div>
        )}

        {/* Normal behavior */}
        {!modelsError && !modelsIsLoading && models && models.length > 0 && (
          <List divided verticalAlign="middle">
            {models.map((model: IModel) => (
              <Model
                key={model.id}
                model={model}
                increment={increment}
                product={product}
              />
            ))}
          </List>
        )}
      </Segment>
      <Button fluid primary onClick={openAddModal}>
        + Add Threat Model
      </Button>

      <ModelsModal />

      <Confirm
        open={modelsConfirmOpen}
        onCancel={() => dispatch(setModelsConfirmOpen(false))}
        onConfirm={confirmDelete}
        content="Do you want to delete this model permanently?"
      />
    </div>
  );
};

export default ThreatModels;
