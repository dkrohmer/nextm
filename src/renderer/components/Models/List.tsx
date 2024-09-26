import React from 'react';
import { List as SemanticList } from 'semantic-ui-react';
import { useSelector } from 'react-redux';
import { IModel } from '../../interfaces/IModel';
import { IProduct } from '../../interfaces/IProduct';
import { IIncrement } from '../../interfaces/IIncrement';
import { RootState } from '../../store';
import Model from '../Model';

interface ListProps {
  product: IProduct;
  increment: IIncrement;
}

const List: React.FC<ListProps> = ({ product, increment }) => {
  /**
   * global states
   */
  const { models, modelsError, modelsIsLoading } = useSelector(
    (state: RootState) => state.models,
  );

  /**
   * tsx
   */
  return (
    <>
      {!modelsError && !modelsIsLoading && models && models.length > 0 && (
        <SemanticList divided verticalAlign="middle">
          {models.map((model: IModel) => (
            <Model
              key={model.id}
              model={model}
              increment={increment}
              product={product}
            />
          ))}
        </SemanticList>
      )}
    </>
  );
};

export default List;
