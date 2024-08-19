import React from 'react';
import { useNavigate } from 'react-router-dom';
import { List } from 'semantic-ui-react';
import { IModel } from '../../interfaces/IModel';
import { IIncrement } from '../../interfaces/IIncrement';
import { IProduct } from '../../interfaces/IProduct';

interface ModelHeaderProps {
  model: IModel;
  increment: IIncrement;
  product: IProduct;
}

const ModelHeader: React.FC<ModelHeaderProps> = ({ model, increment, product }) => {
  /**
   * hooks
   */
  const navigate = useNavigate();

  /**
   * handlers
   */
  const handleNavigate = () => {
    navigate(`/products/${product.id}/increments/${increment.id}/models/${model.id}`)
  }

  /**
   * tsx
   */
  return (
    <List.Header
      as="h3"
      onClick={handleNavigate}
    >
      {model.name}
    </List.Header>
  );
};

export default ModelHeader;
