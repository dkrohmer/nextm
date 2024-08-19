import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { List } from 'semantic-ui-react';
import { IModel } from '../../interfaces/IModel';
import { IIncrement } from '../../interfaces/IIncrement';
import { IProduct } from '../../interfaces/IProduct';
import Loader from './Loader';
import Error from './Error';
import Thumbnail from './Thumbnail';
import Header from './Header';
import CreatedAt from './CreatedAt';
import Actions from './Actions';
import '../../styles/model.css';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import useFetchVersionThumbnail from '../../hooks/useFetchVersionThumbnail';

interface ModelProps {
  model: IModel;
  increment: IIncrement;
  product: IProduct;
}

const Model: React.FC<ModelProps> = ({ model, increment, product }) => {
  /**
   * local states
   */
  const [isHovering, setIsHovering] = useState(false);

  /**
   * hooks
   */
  const navigate = useNavigate();
  useFetchVersionThumbnail(model.id);

  /**
   * handlers
   */
  const handleMouseEnter = () => {
    setIsHovering(true)
  }

  const handleMouseLeave = () => {
    setIsHovering(false)
  }

  const handleNavigate = () => {
    navigate(`/products/${product.id}/increments/${increment.id}/models/${model.id}`)
  }

  /**
   * tsx
   */
  return (
    <div>
      {product && (
        <List.Item
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className="model-clickable-row"
          onClick={handleNavigate}
          key={model.id}
        >
          <Thumbnail modelId={model.id}/>
          <List.Content className="model-content">
            <Header model={model} increment={increment} product={product} />
            <CreatedAt createdAt={model.createdAt} />
          </List.Content>

          {isHovering && (
            <Actions model={model} />
          )}
        </List.Item>
      )}
    </div>
  );
};

export default Model;
