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
    <Container className="products-container">
      <Breadcrumbs />
      <div className="products-filters">
        <Filters />
        <Add />
      </div>
      <Segment basic>
        <Table />
      </Segment>
      <div className="products-pagination-items-container">
        <Pagination />
        <ItemsPerPage />
      </div>
      <ConfirmDelete />
      <Modal />
    </Container>
  );
};

export default Products;
