import React from 'react';
import { Container, Segment } from 'semantic-ui-react';
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
  /**
   * hooks
   */
  useFetchProducts();

  /**
   * tsx
   */
  return (
    <Container className="products-container" data-testid="products-container">
      <Breadcrumbs data-testid="breadcrumbs" />
      <div className="products-filters" data-testid="products-filters">
        <Filters data-testid="filters" />
        <Add data-testid="add" />
      </div>
      <Segment basic data-testid="table-segment">
        <Table data-testid="table" />
      </Segment>
      <div
        className="products-pagination-items-container"
        data-testid="pagination-items-container"
      >
        <Pagination data-testid="pagination" />
        <ItemsPerPage data-testid="items-per-page" />
      </div>
      <ConfirmDelete data-testid="confirm-delete" />
      <Modal data-testid="modal" />
    </Container>
  );
};

export default Products;
