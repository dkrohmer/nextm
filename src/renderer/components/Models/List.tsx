import React from 'react';
import { List as SemanticList } from 'semantic-ui-react';
import { IModel } from '../../interfaces/IModel';
import { IProduct } from '../../interfaces/IProduct';
import { IIncrement } from '../../interfaces/IIncrement';
import Model from '../Model';

interface ListProps {
  models: IModel[];
  product: IProduct;
  increment: IIncrement;
}

const List: React.FC<ListProps> = ({ models, product, increment }) => (
  <SemanticList divided verticalAlign="middle">
    {models.map((model: IModel) => (
      <Model key={model.id} model={model} increment={increment} product={product} />
    ))}
  </SemanticList>
);

export default List;
