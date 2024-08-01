import React from 'react';
import { useDispatch } from 'react-redux';
import { Confirm } from 'semantic-ui-react';
import { handleConfirmDelete, handleCancelDelete } from '../../utils/productsHandlers';
import { AppDispatch } from '../../store';

interface ConfirmDeleteProps {
  openConfirm: boolean;
  productToDelete: string | null;
  productsCurrentPage: number;
  productsItemsPerPage: number;
  products: any[];
  productsSort: string;
  productsSortby: string;
  setOpenConfirm: React.Dispatch<React.SetStateAction<boolean>>;
  setProductToDelete: React.Dispatch<React.SetStateAction<string | null>>;
}

const ConfirmDelete: React.FC<ConfirmDeleteProps> = ({
  openConfirm,
  productToDelete,
  productsCurrentPage,
  productsItemsPerPage,
  products,
  productsSort,
  productsSortby,
  setOpenConfirm,
  setProductToDelete,
}) => {
  const dispatch = useDispatch<AppDispatch>();

  return (
    <Confirm
      open={openConfirm}
      onCancel={() => handleCancelDelete(setOpenConfirm)}
      onConfirm={() => handleConfirmDelete(productToDelete, productsCurrentPage, productsItemsPerPage, products, productsSort, productsSortby, dispatch, setProductToDelete, setOpenConfirm)}
      content="Deleting a product will permanently delete all increments and models associated with it. Do you want to delete this product?"
    />
  );
};

export default ConfirmDelete;
