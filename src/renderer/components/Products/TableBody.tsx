import React from 'react';
import { useSelector } from 'react-redux';
import { Table } from 'semantic-ui-react';
import TableRow from './TableRow';
import Loader from './Loader';
import Error from './Error';
import Empty from './Empty';
import { IProduct } from '../../interfaces/IProduct';
import { RootState } from '../../store';

interface TableBodyProps {
  products: IProduct[];
  setProductToDelete: React.Dispatch<React.SetStateAction<string | null>>;
  setOpenConfirm: React.Dispatch<React.SetStateAction<boolean>>;
}

const TableBody: React.FC<TableBodyProps> = ({ products, setProductToDelete, setOpenConfirm }) => {
  const { productsError, productsIsLoading } = useSelector((state: RootState) => state.products);

  return (
    <Table.Body>
      <Loader isLoading={productsIsLoading} />
      {productsError && <Error error={productsError} />}
      {!productsError && !productsIsLoading && products.length === 0 && <Empty />}

      {products.map((product) => (
        <TableRow
          key={product.id}
          product={product}
          setProductToDelete={setProductToDelete}
          setOpenConfirm={setOpenConfirm}
        />
      ))}
    </Table.Body>
  );
};

export default TableBody;
