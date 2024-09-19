import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PaginationProps, Pagination as SemanticPagination} from 'semantic-ui-react';
import { AppDispatch, RootState } from '../../store';
import '../../styles/products.css';
import { setProductsCurrentPage } from '../../store/products';
import { fetchProducts } from '../../services/api/products';

const Pagination: React.FC = () => {
  /**
   * global states
   */
  const {
    products,
    productsCurrentPage,
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
  const handlePaginationChange = (_e: React.MouseEvent<HTMLAnchorElement>, { activePage }: PaginationProps) => {
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

  /**
   * tsx
   */
  return (
    <div className="products-pagination-container">
      <SemanticPagination
        data-testid="pagination"
        activePage={productsCurrentPage}
        onPageChange={handlePaginationChange}
        totalPages={Math.ceil(products.productsCount / productsItemsPerPage)}
        boundaryRange={1}
        ellipsisItem={undefined}
        firstItem={undefined}
        lastItem={undefined}
        prevItem={undefined}
        nextItem={undefined}
        siblingRange={0}
        size="mini"
      />
    </div>
  );
};

export default Pagination;
