import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Container, Segment } from 'semantic-ui-react';
import { RootState } from '../../store';
import useFetchProducts from '../../hooks/useFetchProducts';
import Breadcrumbs from './Breadcrumbs';
import Modal from './Modal';
import Table from './Table';
import Filters from './Filters';
import Add from './Add';
import Pagination from './Pagination';
import ItemsPerPage from './ItemsPerPage';
import ConfirmDelete from './ConfirmDelete';
import '../../styles/products.css';

const Products: React.FC = () => {
  const {
    productsCurrentPage,
    productsCount,
    productsItemsPerPage,
    productsSort,
    productsSortby,
    products,
  } = useSelector((state: RootState) => state.products);

  const [openConfirm, setOpenConfirm] = useState<boolean>(false);
  const [productToDelete, setProductToDelete] = useState<string | null>(null);

  useFetchProducts();

  return (
    <Container className="products-container">
      <Breadcrumbs />
      
      <div className="products-filters">
        <Filters productsSortby={productsSortby} productsSort={productsSort} />
        <Add />
      </div>

      <Segment basic>
        <Table setProductToDelete={setProductToDelete} setOpenConfirm={setOpenConfirm} />
      </Segment>

      <div className="products-pagination-items-container">
        <Pagination
          productsCurrentPage={productsCurrentPage}
          productsCount={productsCount}
          productsItemsPerPage={productsItemsPerPage}
          productsSort={productsSort}
          productsSortby={productsSortby}
        />
        <ItemsPerPage
          productsItemsPerPage={productsItemsPerPage}
          productsSort={productsSort}
          productsSortby={productsSortby}
        />
      </div>
      
      <ConfirmDelete
        openConfirm={openConfirm}
        productToDelete={productToDelete}
        productsCurrentPage={productsCurrentPage}
        productsItemsPerPage={productsItemsPerPage}
        productsSort={productsSort}
        productsSortby={productsSortby}
        setOpenConfirm={setOpenConfirm}
        setProductToDelete={setProductToDelete}
        products={products}
      />

      <Modal />
    </Container>
  );
};

export default Products;
