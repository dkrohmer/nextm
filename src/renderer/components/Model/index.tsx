import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { List } from 'semantic-ui-react';
import { AppDispatch } from '../../store';
import type { IModel } from '../../interfaces/IModel';
import type { IIncrement } from '../../interfaces/IIncrement';
import type { IProduct } from '../../interfaces/IProduct';
import useFetchVersion from '../../hooks/useFetchVersion';
import Loader from './Loader';
import Error from './Error';
import Thumbnail from './Thumbnail';
import Header from './Header';
import CreatedAt from './CreatedAt';
import Actions from './Actions';
import '../../styles/model.css';

interface ModelProps {
  model: IModel;
  increment: IIncrement;
  product: IProduct;
}

const Model: React.FC<ModelProps> = ({ model, increment, product }) => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { localVersion, isVersionLoading, versionError } = useFetchVersion(model);
  const [isHovering, setIsHovering] = useState(false);

  return (
    <div>
      <Loader isLoading={isVersionLoading} />
      <Error error={versionError} />
      
      {localVersion && !versionError && !isVersionLoading && product && (
        <List.Item
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          className="model-clickable-row"
          key={model.id}
          onClick={() => navigate(`/products/${product.id}/increments/${increment.id}/models/${model.id}`)}
        >
          <Thumbnail thumbnail={localVersion.thumbnail || undefined} />
          <List.Content className="model-content">
            <Header model={model} increment={increment} product={product} />
            <CreatedAt createdAt={model.createdAt} />
          </List.Content>

          {isHovering && (
            <Actions
              model={model}
              dispatch={dispatch}
            />
          )}
        </List.Item>
      )}
    </div>
  );
};

export default Model;
