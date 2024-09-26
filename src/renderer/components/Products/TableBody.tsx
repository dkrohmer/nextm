import React from 'react';
import { useSelector } from 'react-redux';
import { Table } from 'semantic-ui-react';
import { RootState } from '../../store';
import TableRow from './TableRow';
import Loader from './Loader';
import Error from './Error';
import Empty from './Empty';

const TableBody: React.FC = () => {
  /**
   * global states
   */
  const { products, productsError, productsIsLoading } = useSelector(
    (state: RootState) => state.products,
  );

  /**
   * tsx
   */
  return (
    <Table.Body>
      <Loader isLoading={productsIsLoading} />
      {productsError && <Error error={productsError} />}
      {!productsError &&
        !productsIsLoading &&
        products.products.length === 0 && <Empty />}

      {products.products.map((product) => (
        <TableRow product={product} />
      ))}
    </Table.Body>
  );
};

export default TableBody;
