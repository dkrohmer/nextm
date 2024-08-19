import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Confirm } from 'semantic-ui-react';
import { AppDispatch, RootState } from '../../store';
import { setOpenConfirm, setProductsCurrentPage, setProductToDelete } from '../../store/products';
import { deleteProduct } from '../../services/api/products';

const ConfirmDelete: React.FC = () => {
  /**
   * global states
   */
  const {
    productsCurrentPage,
    productsItemsPerPage,
    productsSort,
    productsSortby,
    products,
    openConfirm,
    productToDelete
  } = useSelector((state: RootState) => state.products);

  /**
   * hooks
   */
  const dispatch = useDispatch<AppDispatch>();

  /**
   * handlers
   */
  const handleConfirmDelete = () => {
    if (productToDelete) {
      let offset = (productsCurrentPage - 1) * productsItemsPerPage;
      if (products.length === 1 && offset !== 0) {
        offset -= productsItemsPerPage;
        dispatch(setProductsCurrentPage(productsCurrentPage - 1));
      }
  
      dispatch(
        deleteProduct({
          productId: productToDelete,
          limit: productsItemsPerPage,
          offset,
          sort: productsSort,
          sortby: productsSortby,
        })
      );
      dispatch(setProductToDelete(null));
    }
    dispatch(setOpenConfirm(false));
  };
  
  const handleCancelDelete = () => {
    setOpenConfirm(false);
  };

  /**
   * tsx
   */
  return (
    <Confirm
      open={openConfirm}
      onCancel={() => handleCancelDelete()}
      onConfirm={() => handleConfirmDelete()}
      content="Deleting a product will permanently delete all increments and models associated with it. Do you want to delete this product?"
    />
  );
};

export default ConfirmDelete;
