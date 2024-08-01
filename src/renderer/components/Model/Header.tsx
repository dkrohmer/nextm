import React from 'react';
import { useNavigate } from 'react-router-dom';
import { List } from 'semantic-ui-react';
import type { IModel } from '../../interfaces/IModel';
import type { IIncrement } from '../../interfaces/IIncrement';
import type { IProduct } from '../../interfaces/IProduct';

interface ModelHeaderProps {
  model: IModel;
  increment: IIncrement;
  product: IProduct;
}

const ModelHeader: React.FC<ModelHeaderProps> = ({ model, increment, product }) => {
  const navigate = useNavigate();
  return (
    <List.Header
      as="h3"
      onClick={() => navigate(`/products/${product.id}/increments/${increment.id}/models/${model.id}`)}
    >
      {model.name}
    </List.Header>
  );
};

export default ModelHeader;
