import React from 'react';
import { useDispatch } from 'react-redux';
import { Dropdown, Button, Icon } from 'semantic-ui-react';
import { handleSortFieldChange, toggleSortDirection, sortFields } from '../../utils/productsHandlers';
import { AppDispatch } from '../../store';
import '../../styles/products.css';

interface FiltersProps {
  productsSortby: string;
  productsSort: string;
}

const Filters: React.FC<FiltersProps> = ({
  productsSortby,
  productsSort,
}) => {
  const dispatch = useDispatch<AppDispatch>();

  return (
    <div className="products-filter-buttons">
      <Dropdown
        text="Sort by"
        icon="sort amount down"
        floating
        labeled
        button
        className="icon products-sort-button"
        options={sortFields}
        value={productsSortby}
        onChange={(e, data) => handleSortFieldChange(e, data, dispatch)}
      />
      <Button
        icon
        onClick={() => toggleSortDirection(dispatch)}
        className="products-sort-button"
      >
        <Icon
          name={
            productsSort === 'asc'
              ? 'long arrow alternate up'
              : 'long arrow alternate down'
          }
        />
      </Button>
    </div>
  );
};

export default Filters;
