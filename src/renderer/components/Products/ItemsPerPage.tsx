import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dropdown, DropdownProps } from 'semantic-ui-react';
import { AppDispatch, RootState } from '../../store';
import '../../styles/products.css';
import {
  resetProductsCurrentPage,
  setProductsItemsPerPage,
} from '../../store/products';
import { fetchProducts } from '../../services/api/products';

const itemsPerPageOptions = [
  { key: '5', text: '5 items', value: 5 },
  { key: '10', text: '10 items', value: 10 },
  { key: '25', text: '25 items', value: 25 },
  { key: '50', text: '50 items', value: 50 },
  { key: '100', text: '100 items', value: 100 },
];

const ItemsPerPage: React.FC = () => {
  /**
   * global states
   */
  const { productsItemsPerPage, productsSort, productsSortby } = useSelector(
    (state: RootState) => state.products,
  );

  /**
   * hooks
   */
  const dispatch = useDispatch<AppDispatch>();

  /**
   * handlers
   */
  const handleItemsPerPageChange = async (
    _event: React.SyntheticEvent<HTMLElement>,
    data: DropdownProps,
  ) => {
    dispatch(setProductsItemsPerPage(data.value as number));
    dispatch(resetProductsCurrentPage());

    await dispatch(
      fetchProducts({
        limit: data.value as number,
        offset: 0,
        sort: productsSort,
        sortby: productsSortby,
      }),
    );
  };

  /**
   * tsx
   */
  return (
    <Dropdown
      data-testid="items-per-page-dropdown"
      selection
      options={itemsPerPageOptions}
      value={productsItemsPerPage}
      onChange={handleItemsPerPageChange}
      fluid
      className="products-items-per-page"
    />
  );
};

export default ItemsPerPage;
