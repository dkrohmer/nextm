import React, { useState, useEffect } from 'react';
import { 
  Button,
  Container,
  Breadcrumb,
  Confirm,
  Dimmer,
  Dropdown,
  DropdownProps,
  Icon,
  Loader,
  Message,
  Pagination,
  PaginationProps,
  Popup,
  Segment,
  Table,
  Label
} from 'semantic-ui-react';

import { useNavigate } from 'react-router-dom';  // For React Router v6

import type { IProduct } from '../../interfaces/IProduct';
import type { IResponsible } from '../../interfaces/IResponsible';
import ProductsModal from './ProductsModal';

import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../store';
import { 
  fetchProducts, 
  deleteProduct, 
  setProductsIsCloning,
  setProductsModalOpen, 
  setProductsCurrentProduct,
  setProductsCurrentPage, 
  resetProductsCurrentPage,
  setProductsItemsPerPage,
  setProductsSortby,
  toggleProductsSort,
  setProductsIsEditing
} from '../../store/ProductsStore';

const itemsPerPageOptions = [
  { key: '5', text: '5 items', value: 5 },
  { key: '10', text: '10 items', value: 10 },
  { key: '25', text: '25 items', value: 25 },
  { key: '50', text: '50 items', value: 50 },
  { key: '100', text: '100 items', value: 100 }
];

const sortFields = [
  { key: 'createdAt', text: 'Created at', value: 'createdAt' },
  { key: 'name', text: 'Name', value: 'name' },
  { key: 'startsAt', text: 'Product start', value: 'startsAt' },
  { key: 'endsAt', text: 'Product end', value: 'endsAt' }
];

const validSortFields: string[] = sortFields.map(field => field.value);

const Products: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const {
    productsCurrentPage,
    products,
    productsError,
    productsIsLoading, 
    productsCount,
    productsSort,
    productsSortby,
    productsItemsPerPage
  } = useSelector((state: RootState) => state.products);

  const [openConfirm, setOpenConfirm] = useState<boolean>(false);
  const [productToDelete, setProductToDelete] = useState<string | null>(null);
  const [hoveredProductId, setHoveredProductId] = useState<string | null>(null);

  const openAddModal = () => {
    dispatch(setProductsCurrentProduct({
      id: '',
      name: '',
      startsAt: '',
      endsAt: '',
      createdAt: ''
    }));
    dispatch(setProductsModalOpen(true));
    dispatch(setProductsIsEditing(false));
  };

  const openEditModal = (product: IProduct) => {
    dispatch(setProductsCurrentProduct(product));
    dispatch(setProductsModalOpen(true));
    dispatch(setProductsIsEditing(true));
  };

  const handleDelete = (productId: string) => {
    setProductToDelete(productId);
    setOpenConfirm(true);
  };

  const handleClone = (e: React.MouseEvent<HTMLButtonElement>, product: IProduct) => {
    e.stopPropagation();
    dispatch(setProductsIsCloning(true));
    dispatch(setProductsCurrentProduct({...product, name: `${product.name} (Copy)`}));
    dispatch(setProductsModalOpen(true));
  };

  const handleConfirmDelete = () => {
    if (productToDelete) {
      let offset = ((productsCurrentPage as number) - 1) * productsItemsPerPage;
      if (products.length === 1 && offset !== 0) {
        offset = offset - productsItemsPerPage;
        dispatch(setProductsCurrentPage(productsCurrentPage - 1));
      }
    
      dispatch(deleteProduct({
        productId: productToDelete, 
        limit: productsItemsPerPage, 
        offset: offset, 
        sort: productsSort, 
        sortby: productsSortby
      }));
      setProductToDelete(null);
    }
    setOpenConfirm(false);
  };

  const handleCancelDelete = () => {
    setOpenConfirm(false);
  };

  const handlePaginationChange = (_e: React.MouseEvent<HTMLAnchorElement>, { activePage }: PaginationProps) => {
    dispatch(setProductsCurrentPage(activePage as number));
    const offset = ((activePage as number) - 1) * productsItemsPerPage;
    dispatch(fetchProducts({ 
      limit: productsItemsPerPage, 
      offset: offset, 
      sort: productsSort, 
      sortby: productsSortby
    }));
  };

  const handleItemsPerPageChange = (_event: React.SyntheticEvent<HTMLElement>, data: DropdownProps) => {
    dispatch(setProductsItemsPerPage(data.value as number));
    dispatch(resetProductsCurrentPage());
    dispatch(fetchProducts({ 
      limit: data.value as number, 
      offset: 0, 
      sort: productsSort, 
      sortby: productsSortby
    }));
  };

  const handleSortFieldChange = (
    _event: React.SyntheticEvent<HTMLElement>,
    data: DropdownProps
  ) => {
    if (typeof data.value === 'string' && validSortFields.includes(data.value)) {
      dispatch(setProductsSortby({sortby: data.value}));
    } else {
      console.error('Invalid sort field');
    }
  };
  
  const toggleSortDirection = () => {
    dispatch(toggleProductsSort());
  };

  const formatResponsibles = (responsibles: IResponsible[]) => {
    return responsibles.map((responsible, index) => {  
      return (
        <>
          <Label key={responsible.id} size='tiny' style={{ margin: '2px' }}>
            <Icon name='user' />
            {`${responsible.firstName} ${responsible.lastName}${responsible.role ? ` (${responsible.role})` : ''}`}
          </Label>
          {index < responsibles.length - 1 && <span>, </span>}
        </>
      );
    })
  };

  const handleMouseEnter = (productId: string) => {
    setHoveredProductId(productId);
  };

  const handleMouseLeave = () => {
    setHoveredProductId(null);
  };

  const navigateToProduct = (product: IProduct) => {
    const latestIncrement = product.latestIncrementId ? `/increments/${product.latestIncrementId}` : '';
    navigate(`/products/${product.id}${latestIncrement}`);
  };

  useEffect(() => {
    dispatch(fetchProducts({ 
      limit: productsItemsPerPage, 
      offset: (productsCurrentPage - 1) * productsItemsPerPage, 
      sort: productsSort, 
      sortby: productsSortby
    }));
  }, [
    dispatch, 
    productsItemsPerPage, 
    productsCurrentPage, 
    productsSort, 
    productsSortby,
  ]);

  // tsx
  return (
    <>
      <Container style={{ marginTop: '10em' }}>
        {/* Breadcrumbs */}
        <Breadcrumb>
          <Breadcrumb.Section active>Products</Breadcrumb.Section>
        </Breadcrumb>
      
        <div style={{ display: 'flex', paddingTop: '20px'}}>
          {/* Filter buttons */}
          <div style={{ flex: 1, justifyContent: 'left', display: 'flex' }}>
            <Dropdown
              text='Sort by'
              icon='sort amount down'
              floating
              labeled
              button
              className='icon'
              options={sortFields}
              value={productsSortby}
              onChange={handleSortFieldChange}
              style={{ marginRight: '10px' }}
            />

            <Button icon onClick={toggleSortDirection} style={{ marginRight: '10px' }}>
              <Icon name={productsSort === 'asc' ? 'long arrow alternate up' : 'long arrow alternate down'} />
            </Button>
          </div>

          {/* Add product */}
          <div>
            <Button onClick={openAddModal} primary>
              + Add Product
            </Button>
          </div>
        </div>

        <Segment basic>
          {/* Loader */}
          <Dimmer active={productsIsLoading} inverted={true}>
            <Loader>Loading Products...</Loader>
          </Dimmer>

          <Table size='small'>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Name</Table.HeaderCell>
                <Table.HeaderCell>Description</Table.HeaderCell>
                <Table.HeaderCell>Responsible(s)</Table.HeaderCell>
                <Table.HeaderCell>Deadline</Table.HeaderCell>
                <Table.HeaderCell>Created at</Table.HeaderCell>
                <Table.HeaderCell>Actions</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {/* Error handling */}
              {productsError && (
                <Table.Row>
                  <Table.Cell colSpan="8" textAlign="center">
                    <Message negative>
                      <Message.Header>
                        Error❗️
                      </Message.Header>
                      <p>
                        {productsError}
                      </p>
                    </Message>
                  </Table.Cell>
                </Table.Row>
              )}
              {/* No products available. */}
              {!productsError && !productsIsLoading && products.length <= 0 && (
                <Table.Row>
                  <Table.Cell colSpan="8" textAlign="center">
                    <h3 className='empty-message-header'>
                      It's quiet here 💤
                    </h3>
                    <div className='empty-message-body'>
                      Let's get productive by clicking <Label>+ Add Product</Label>
                    </div>
                  </Table.Cell>
                </Table.Row>
              )}

              {/* Normal behavior */}
              {!productsError && !productsIsLoading && products.length > 0 && (
                products.slice(0, productsItemsPerPage).map((product) => (
                  <Table.Row 
                    className= 'clickable-row' 
                    key={product.id}
                    onMouseEnter={() => handleMouseEnter(product.id)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <Table.Cell style={{maxWidth: '200px'}}>
                      <div className='ellipsis'>
                        <a onClick={() => navigateToProduct(product)}>
                          <b>{product.name}</b>
                        </a>
                      </div>
                    </Table.Cell>
                    <Popup
                      trigger={
                        <Table.Cell style={{maxWidth: '300px'}}>
                          <div className='ellipsis' >
                            {product.description || 'n/a'}
                          </div>
                        </Table.Cell>
                      }
                      content={`${product.description || 'n/a'}`}
                    />
                    <Table.Cell style={{maxWidth: '300px'}}>
                      <div className="ellipsis">
                        {product.responsibles && product.responsibles.length > 0 ? formatResponsibles(product.responsibles) : 'n/a'}
                      </div>
                    </Table.Cell>
                    <Table.Cell>
                      {product.endsAt ? new Date(product.endsAt).toLocaleDateString() : 'n/a'}
                    </Table.Cell>
                    <Table.Cell>
                      {new Date(product.createdAt).toLocaleString()}
                    </Table.Cell>
                    <Table.Cell style={{width: '150px'}}>
                      <div style={{
                        visibility: hoveredProductId === product.id ? 'visible' : 'visible',
                        opacity: hoveredProductId === product.id ? 1 : 0.2}}
                      >
                        <Popup
                          trigger={
                            <Button basic size='tiny' icon onClick={(e) => {
                              e.stopPropagation();
                              openEditModal(product);
                            }}>
                              <Icon name='pencil' />
                            </Button>
                          }
                          content={`Edit product "${product.name}"`}
                        />
                        <Popup
                          trigger={
                            <Button basic size='tiny' icon onClick={(e) => {
                              handleClone(e, product);
                            }}>
                              <Icon name='clone' />
                            </Button>
                          }
                          content={`Clone product "${product.name}"`}
                        />
                        <Popup
                          trigger={
                            <Button basic size='tiny' icon  onClick={(e) => {
                              e.stopPropagation();
                              handleDelete(product.id);
                            }}>
                              <Icon color='red' name='trash' />
                            </Button>
                          }
                          content={`Delete product "${product.name}"`}
                        />
                      </div>
                    </Table.Cell>
                  </Table.Row>
                ))
              )}
            </Table.Body>
          </Table>
        </Segment>

        {/* Pagination */}
        <div style={{ display: 'flex', paddingTop: '20px', paddingBottom: '50px'}}>
          <div style={{ flex: 1, justifyContent: 'left', display: 'flex' }}>
            <Pagination
              activePage={productsCurrentPage}
              onPageChange={handlePaginationChange}
              totalPages={Math.ceil(productsCount / productsItemsPerPage)}
              boundaryRange={1}
              ellipsisItem={undefined}
              firstItem={undefined}
              lastItem={undefined}
              prevItem={undefined}
              nextItem={undefined}
              siblingRange={0}
              size='mini'
            />
          </div>

          {/* Items per page */}
          <div>
            <Dropdown 
              selection
              options={itemsPerPageOptions}
              value={productsItemsPerPage}
              onChange={handleItemsPerPageChange}
              fluid
              style={{ marginRight: '10px', fontSize: '14px'}}
            />
          </div>
        </div>

        {/* Confirmation handler */}
        <Confirm
          open={openConfirm}
          onCancel={handleCancelDelete}
          onConfirm={handleConfirmDelete}
          content='Deleting a product will permanently delete all increments and models associated with it. Do you want to delete this product?'
        />

        {/* Products modal */}
        <ProductsModal/>

      </Container>
    </>
  );
};

export default Products;
