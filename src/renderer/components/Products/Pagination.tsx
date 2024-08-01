import React from 'react';
import { useDispatch } from 'react-redux';
import { Pagination as SemanticPagination} from 'semantic-ui-react';
import { handlePaginationChange } from '../../utils/productsHandlers';
import { AppDispatch } from '../../store';
import '../../styles/products.css';

interface PaginationProps {
  productsCurrentPage: number;
  productsCount: number;
  productsItemsPerPage: number;
  productsSort: string;
  productsSortby: string;
}

const Pagination: React.FC<PaginationProps> = ({
  productsCurrentPage,
  productsCount,
  productsItemsPerPage,
  productsSort,
  productsSortby,
}) => {
  const dispatch = useDispatch<AppDispatch>();

  return (
    <div className="products-pagination-container">
      <SemanticPagination
        activePage={productsCurrentPage}
        onPageChange={(e, data) =>
          handlePaginationChange(e, data, productsItemsPerPage, productsSort, productsSortby, dispatch)
        }
        totalPages={Math.ceil(productsCount / productsItemsPerPage)}
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
