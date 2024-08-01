import React from 'react';
import { useSelector } from 'react-redux';
import { Segment } from 'semantic-ui-react';
import { IProduct } from '../../interfaces/IProduct';
import { IIncrement } from '../../interfaces/IIncrement';
import { RootState } from '../../store';
import Modal from './Modal';
import Loader from './Loader';
import Error from './Error';
import Empty from './Empty';
import Add from './Add';
import Confirm from './Confirm';
import List from './List';
import useFetchModels from '../../hooks/useFetchModels';
import '../../styles/models.css';

interface ModelsProps {
  product: IProduct;
  increment: IIncrement;
  number: number;
}

const Models: React.FC<ModelsProps> = ({ product, increment }) => {
  const { models, modelsError, modelsIsLoading, modelsConfirmOpen, modelToDelete } = useSelector(
    (state: RootState) => state.models
  );

  useFetchModels();

  return (
    <div>
      <Segment basic className="models-segment">
        <Loader isLoading={modelsIsLoading} />
        <Error error={modelsError} />
        {!modelsError && !modelsIsLoading && models && models.length === 0 && <Empty />}
        {!modelsError && !modelsIsLoading && models && models.length > 0 && (
          <List models={models} product={product} increment={increment} />
        )}
      </Segment>
      <Add />
      <Modal />
      <Confirm open={modelsConfirmOpen} modelToDelete={modelToDelete} />
    </div>
  );
};

export default Models;
