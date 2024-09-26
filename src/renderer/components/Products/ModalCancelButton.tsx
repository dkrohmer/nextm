import React from 'react';
import { useDispatch } from 'react-redux';
import { Form } from 'semantic-ui-react';
import { AppDispatch } from '../../store';
import {
  resetProductsCurrentPage,
  setProductsIsCloning,
  setProductsIsEditing,
  setProductsModalOpen,
  setProductsSort,
  setProductsSortby,
} from '../../store/products';
import { fetchProducts } from '../../services/api/products';

const ModalCancelButton: React.FC = () => {
  /**
   * hooks
   */
  const dispatch = useDispatch<AppDispatch>();

  /**
   * handlers
   */
  const handleClose = () => {
    dispatch(resetProductsCurrentPage());
    dispatch(setProductsSort({ sort: 'desc' }));
    dispatch(setProductsSortby({ sortby: 'createdAt' }));
    dispatch(
      fetchProducts({
        limit: 10,
        offset: 0,
        sort: 'desc',
        sortby: 'createdAt',
      }),
    );
    dispatch(setProductsModalOpen(false));
    dispatch(setProductsIsCloning(false));
    dispatch(setProductsIsEditing(false));
  };

  /**
   * tsx
   */
  return (
    <Form.Button className="products-modal-cancel-button" onClick={handleClose}>
      Cancel
    </Form.Button>
  );
};

export default ModalCancelButton;
