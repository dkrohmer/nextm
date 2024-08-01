import { useNavigate } from 'react-router-dom';
import { DropdownProps, PaginationProps } from 'semantic-ui-react';
import { AppDispatch } from '../store';
import { IProduct } from '../interfaces/IProduct';
import { fetchProducts, fetchProduct, addOrUpdateProduct, deleteProduct } from '../services/api/products';
import {
  setProductsCurrentProduct,
  resetProductsCurrentPage,
  setProductsSort,
  setProductsSortby,
  setProductsModalOpen,
  setProductsIsCloning,
  setProductsIsEditing,
  setProductsCurrentPage,
  setProductsItemsPerPage,
  toggleProductsSort,
} from '../store/products';

export const itemsPerPageOptions = [
  { key: '5', text: '5 items', value: 5 },
  { key: '10', text: '10 items', value: 10 },
  { key: '25', text: '25 items', value: 25 },
  { key: '50', text: '50 items', value: 50 },
  { key: '100', text: '100 items', value: 100 },
];

export const sortFields = [
  { key: 'createdAt', text: 'Created at', value: 'createdAt' },
  { key: 'name', text: 'Name', value: 'name' },
  { key: 'startsAt', text: 'Product start', value: 'startsAt' },
  { key: 'endsAt', text: 'Product end', value: 'endsAt' },
];

export const handleInputChange = (
  e: React.ChangeEvent<HTMLInputElement>,
  key: string,
  productsCurrentProduct: IProduct | null,
  dispatch: AppDispatch
) => {
  if (productsCurrentProduct) {
    dispatch(
      setProductsCurrentProduct({
        ...productsCurrentProduct,
        [key]: e.target.value,
      })
    );
  }
};

export const handleDescriptionChange = (
  value: string,
  productsCurrentProduct: IProduct | null,
  dispatch: AppDispatch
) => {
  if (productsCurrentProduct) {
    dispatch(
      setProductsCurrentProduct({
        ...productsCurrentProduct,
        description: value,
      })
    );
  }
};

export const handleClose = (dispatch: AppDispatch) => {
  dispatch(resetProductsCurrentPage());
  dispatch(setProductsSort({ sort: 'desc' }));
  dispatch(setProductsSortby({ sortby: 'createdAt' }));
  dispatch(
    fetchProducts({
      limit: 10,
      offset: 0,
      sort: 'desc',
      sortby: 'createdAt',
    })
  );
  dispatch(setProductsModalOpen(false));
  dispatch(setProductsIsCloning(false));
  dispatch(setProductsIsEditing(false));
};

export const closeModal = (dispatch: AppDispatch) => {
  dispatch(setProductsModalOpen(false));
};

export const handleSubmit = async (
  productsCurrentProduct: IProduct | null,
  productsIsCloning: boolean,
  dispatch: AppDispatch
) => {
  if (productsCurrentProduct) {
    let product: IProduct;

    if (productsIsCloning) {
      const cloneResponse = await dispatch(
        fetchProduct({
          productId: productsCurrentProduct.id,
          isEagerLoading: true,
        })
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
  handleClose(dispatch);
};

export const handleModalHeader = (
  productsIsCloning: boolean,
  productsIsEditing: boolean
) => {
  return productsIsCloning
    ? 'Clone Product'
    : productsIsEditing
      ? 'Edit Product'
      : 'Add Product';
};

export const handleSubmitButtonText = (
  productsIsCloning: boolean,
  productsIsEditing: boolean
) => {
  return productsIsCloning
    ? 'Clone'
    : productsIsEditing
      ? 'Edit'
      : 'Add';
};

export const openAddModal = (dispatch: AppDispatch) => {
  dispatch(
    setProductsCurrentProduct({
      id: '',
      name: '',
      startsAt: '',
      endsAt: '',
      createdAt: '',
    })
  );
  dispatch(setProductsModalOpen(true));
  dispatch(setProductsIsEditing(false));
};

export const openEditModal = (dispatch: AppDispatch, product: IProduct) => {
  dispatch(setProductsCurrentProduct(product));
  dispatch(setProductsModalOpen(true));
  dispatch(setProductsIsEditing(true));
};

export const handleDelete = (
  productId: string,
  setProductToDelete: React.Dispatch<React.SetStateAction<string | null>>,
  setOpenConfirm: React.Dispatch<React.SetStateAction<boolean>>
) => {
  setProductToDelete(productId);
  setOpenConfirm(true);
};

export const handleClone = (
  e: React.MouseEvent<HTMLButtonElement>,
  product: IProduct,
  dispatch: AppDispatch
) => {
  e.stopPropagation();
  dispatch(setProductsIsCloning(true));
  dispatch(
    setProductsCurrentProduct({ ...product, name: `${product.name} (Copy)` })
  );
  dispatch(setProductsModalOpen(true));
};

export const handleConfirmDelete = (
  productToDelete: string | null,
  productsCurrentPage: number,
  productsItemsPerPage: number,
  products: IProduct[],
  productsSort: string,
  productsSortby: string,
  dispatch: AppDispatch,
  setProductToDelete: React.Dispatch<React.SetStateAction<string | null>>,
  setOpenConfirm: React.Dispatch<React.SetStateAction<boolean>>
) => {
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
    setProductToDelete(null);
  }
  setOpenConfirm(false);
};

export const handleCancelDelete = (
  setOpenConfirm: React.Dispatch<React.SetStateAction<boolean>>
) => {
  setOpenConfirm(false);
};

export const handlePaginationChange = (
  _e: React.MouseEvent<HTMLAnchorElement>,
  { activePage }: PaginationProps,
  productsItemsPerPage: number,
  productsSort: string,
  productsSortby: string,
  dispatch: AppDispatch
) => {
  dispatch(setProductsCurrentPage(activePage as number));
  const offset = ((activePage as number) - 1) * productsItemsPerPage;
  dispatch(
    fetchProducts({
      limit: productsItemsPerPage,
      offset,
      sort: productsSort,
      sortby: productsSortby,
    })
  );
};

export const handleItemsPerPageChange = (
  _event: React.SyntheticEvent<HTMLElement>,
  data: DropdownProps,
  dispatch: AppDispatch,
  productsSort: string,
  productsSortby: string
) => {
  dispatch(setProductsItemsPerPage(data.value as number));
  dispatch(resetProductsCurrentPage());
  dispatch(
    fetchProducts({
      limit: data.value as number,
      offset: 0,
      sort: productsSort,
      sortby: productsSortby,
    })
  );
};

export const validSortFields: string[] = sortFields.map((field) => field.value);

export const handleSortFieldChange = (
  _event: React.SyntheticEvent<HTMLElement>,
  data: DropdownProps,
  dispatch: AppDispatch
) => {
  if (typeof data.value === 'string' && validSortFields.includes(data.value)) {
    dispatch(setProductsSortby({ sortby: data.value }));
  }
};

export const toggleSortDirection = (dispatch: AppDispatch) => {
  dispatch(toggleProductsSort());
};

export const handleMouseEnter = (
  productId: string,
  setHoveredProductId: React.Dispatch<React.SetStateAction<string | null>>
) => {
  setHoveredProductId(productId);
};

export const handleMouseLeave = (
  setHoveredProductId: React.Dispatch<React.SetStateAction<string | null>>
) => {
  setHoveredProductId(null);
};

export const navigateToProduct = (
  product: IProduct,
  navigate: ReturnType<typeof useNavigate>
) => {
  const latestIncrement = product.latestIncrementId
    ? `/increments/${product.latestIncrementId}`
    : '';
  navigate(`/products/${product.id}${latestIncrement}`);
};