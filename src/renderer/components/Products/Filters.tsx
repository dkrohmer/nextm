import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dropdown, Button, Icon, DropdownProps } from 'semantic-ui-react';
import { AppDispatch, RootState } from '../../store';
import '../../styles/products.css';
import { setProductsSortby, toggleProductsSort } from '../../store/products';

const sortFields = [
  { key: 'createdAt', text: 'Created at', value: 'createdAt' },
  { key: 'name', text: 'Name', value: 'name' },
  { key: 'startsAt', text: 'Product start', value: 'startsAt' },
  { key: 'endsAt', text: 'Product end', value: 'endsAt' },
];

const validSortFields: string[] = sortFields.map((field) => field.value);

const Filters: React.FC = () => {
  /**
   * global states
   */
  const {
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
  const handleSortDirection = () => {
    dispatch(toggleProductsSort());
  };

  const handleSortFieldChange = (_event: React.SyntheticEvent<HTMLElement>, data: DropdownProps) => {
    if (typeof data.value === 'string' && validSortFields.includes(data.value)) {
      dispatch(setProductsSortby({ sortby: data.value }));
    }
  };

  /**
   * tsx
   */
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
        onChange={handleSortFieldChange}
        data-testid="sort-dropdown"
      />
      <Button
        icon
        onClick={handleSortDirection}
        className="products-sort-button"
        data-testid="sort-direction-button"
      >
        <Icon
          name={productsSort === 'asc' ? 'long arrow alternate up' : 'long arrow alternate down'}
          data-testid="sort-icon"
        />
      </Button>
    </div>
  );
};

export default Filters;
