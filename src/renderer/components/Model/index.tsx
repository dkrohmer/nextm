import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { List } from 'semantic-ui-react';
import { IModel } from '../../interfaces/IModel';
import { IIncrement } from '../../interfaces/IIncrement';
import { IProduct } from '../../interfaces/IProduct';
import Thumbnail from './Thumbnail';
import Header from './Header';
import CreatedAt from './CreatedAt';
import Actions from './Actions';
import useFetchVersionThumbnail from '../../hooks/useFetchVersionThumbnail';
import '../../styles/model.css';

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
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  const handleNavigate = () => {
    navigate(
      `/products/${product.id}/increments/${increment.id}/models/${model.id}`,
    );
  };

  /**
   * tsx
   */
  return (
    <div className="model-wrapper" data-testid="model-wrapper">
      {product && (
        <List.Item
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className="model-clickable-row"
          onClick={handleNavigate}
          key={model.id}
          data-testid="model-item"
        >
          <Thumbnail modelId={model.id} data-testid="model-thumbnail" />
          <List.Content className="model-content" data-testid="model-content">
            <Header
              model={model}
              increment={increment}
              product={product}
              data-testid="model-header"
            />
            <CreatedAt
              createdAt={model.createdAt}
              data-testid="model-created-at"
            />
          </List.Content>

          {isHovering && (
            <Actions
              model={model}
              isVisible={isHovering}
              data-testid="model-actions-container"
            />
          )}
        </List.Item>
      )}
    </div>
  );
};

export default Model;
