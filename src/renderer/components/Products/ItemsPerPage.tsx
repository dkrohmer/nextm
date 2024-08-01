import React from 'react';
import { useDispatch } from 'react-redux';
import { Dropdown } from 'semantic-ui-react';
import { handleItemsPerPageChange, itemsPerPageOptions } from '../../utils/productsHandlers';
import { AppDispatch } from '../../store';
import '../../styles/products.css';

interface ItemsPerPageProps {
  productsItemsPerPage: number;
  productsSort: string;
  productsSortby: string;
}

const ItemsPerPage: React.FC<ItemsPerPageProps> = ({
  productsItemsPerPage,
  productsSort,
  productsSortby,
}) => {
  const dispatch = useDispatch<AppDispatch>();

  return (
    <Dropdown
      selection
      options={itemsPerPageOptions}
      value={productsItemsPerPage}
      onChange={(e, data) => handleItemsPerPageChange(e, data, dispatch, productsSort, productsSortby)}
      fluid
      className="products-items-per-page"
    />
  );
};

export default ItemsPerPage;
