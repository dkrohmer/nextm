import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Modal as SemanticModal, Form } from 'semantic-ui-react';
import { RootState, AppDispatch } from '../../store';
import ModalName from './ModalName';
import ModalDescription from './ModalDescription';
import ModalResponsible from './ModalResponsible';
import ModalStartsAt from './ModalStartsAt';
import ModalEndsAt from './ModalEndsAt';
import ModalSubmitButton from './ModalSubmitButton';
import ModalCancelButton from './ModalCancelButton';
import {
  addOrUpdateProduct,
  fetchProduct,
  fetchProducts,
} from '../../services/api/products';
import { IProduct } from '../../interfaces/IProduct';
import {
  resetProductsCurrentPage,
  setProductsIsCloning,
  setProductsIsEditing,
  setProductsItemsPerPage,
  setProductsModalOpen,
  setProductsSort,
  setProductsSortby,
} from '../../store/products';

const Modal: React.FC = () => {
  /**
   * global states
   */
  const {
    productsIsCloning,
    productsModalOpen,
    productsCurrentProduct,
    productsIsEditing,
    productsItemsPerPage,
    productsSort,
    productsSortby,
  } = useSelector((state: RootState) => state.products);

  /**
   * hooks
   */
  const dispatch = useDispatch<AppDispatch>();

  /**
   * handlers
   */
  const handleModalHeader = () => {
    return productsIsCloning
      ? 'Clone Product'
      : productsIsEditing
        ? 'Edit Product'
        : 'Add Product';
  };

  const handleSubmit = async () => {
    if (productsCurrentProduct) {
      let product: IProduct;

      if (productsIsCloning) {
        const cloneResponse = await dispatch(
          fetchProduct({
            productId: productsCurrentProduct.id,
            isEagerLoading: true,
          }),
        );
        if (fetchProduct.fulfilled.match(cloneResponse)) {
          const eagerProduct: IProduct = cloneResponse.payload;
          product = {
            ...eagerProduct,
            name: productsCurrentProduct.name,
            description: productsCurrentProduct.description,
            responsibles: productsCurrentProduct.responsibles,
            startsAt: productsCurrentProduct.startsAt,
            endsAt: productsCurrentProduct.endsAt,
            id: '',
          };
        } else {
          return;
        }
      } else {
        product = productsCurrentProduct;
      }
      await dispatch(addOrUpdateProduct({ product }));
    }
    handleClose();
  };

  const handleClose = () => {
    dispatch(resetProductsCurrentPage());
    dispatch(setProductsSort({ sort: 'desc' }));
    dispatch(setProductsSortby({ sortby: 'createdAt' }));
    dispatch(
      fetchProducts({
        limit: productsItemsPerPage,
        offset: 0,
        sort: productsSort,
        sortby: productsSortby,
      }),
    );
    dispatch(setProductsModalOpen(false));
    dispatch(setProductsIsCloning(false));
    dispatch(setProductsIsEditing(false));
  };

  const closeModal = () => {
    dispatch(setProductsModalOpen(false));
  };

  /**
   * tsx
   */
  return (
    <SemanticModal
      open={productsModalOpen}
      onClose={closeModal}
      dimmer="blurring"
    >
      <SemanticModal.Header>{handleModalHeader()}</SemanticModal.Header>
      <SemanticModal.Content>
        <Form onSubmit={handleSubmit}>
          <ModalName />
          <ModalDescription />
          <ModalResponsible />
          <ModalStartsAt />
          <ModalEndsAt />
          <Form.Group className="products-modal-form-button-group">
            <ModalSubmitButton />
            <ModalCancelButton />
          </Form.Group>
        </Form>
      </SemanticModal.Content>
    </SemanticModal>
  );
};

export default Modal;
