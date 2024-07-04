// src/components/products/ProductsModal.tsx
import React from 'react';
import { Button, Modal, Form } from 'semantic-ui-react';
import { useSelector, useDispatch } from 'react-redux';

import { IProduct } from '../../interfaces/IProduct';
import { IResponsible } from '../../interfaces/IResponsible';
import { AppDispatch, RootState } from '../../store';
import { 
  fetchProducts,
  fetchProduct,
  addOrUpdateProduct,
  setProductsModalOpen,
  setProductsIsCloning,
  setProductsIsEditing,
  resetProductsCurrentPage,
  setProductsSort,
  setProductsSortby,
  setProductsCurrentProduct, 
} from '../../store/ProductsStore';

const ProductsModal: React.FC = () => {

  const dispatch = useDispatch<AppDispatch>(); // Use the AppDispatch type here

  // global redux states
  const { 
    productsIsCloning,
    productsModalOpen, 
    productsCurrentProduct, 
    productsIsEditing 
  } = useSelector((state: RootState) => state.products);

  // local states
  // const [newResponsibles, setNewResponsibles] = useState<IResponsible[]>([{
  //   id: '',
  //   firstName: '',
  //   lastName: '',
  //   role: '',
  // }]);

  // const handleResponsibleChange = (index: number, field: keyof IResponsible, value: string) => {
  //   const updatedResponsibles = newResponsibles.map((resp, i) => i === index ? { ...resp, [field]: value } : resp);
  //   setNewResponsibles(updatedResponsibles);
  // };

  // Updated to align with Semantic UI React's expected parameters for onChange
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, key: string) => {
    if (productsCurrentProduct) {
      dispatch(setProductsCurrentProduct({ ...productsCurrentProduct, [key]: e.target.value } ));
    }
  };

  const handleSubmit = async () => {
    if (productsCurrentProduct) {
      let product: IProduct;
      
      if (productsIsCloning) {
        const cloneResponse = await dispatch(fetchProduct({ productId: productsCurrentProduct.id, isEagerLoading: true }));
        if (fetchProduct.fulfilled.match(cloneResponse)) {
          const eagerProduct: IProduct = cloneResponse.payload;
          // product = { ...eagerProduct, id: '', name: `${productsCurrentProduct.name}` };
          product = { 
            ...eagerProduct, 
            name: productsCurrentProduct.name,
            description: productsCurrentProduct.description,
            responsibles: productsCurrentProduct.responsibles,
            startsAt: productsCurrentProduct.startsAt,
            endsAt: productsCurrentProduct.endsAt,
            id: '' };
        } else {
          // Handle the case where cloning fails
          console.error("Cloning failed");
          return;
        }
      } else {
        product = productsCurrentProduct;
      }
      // product = { ...product, responsibles: newResponsibles }
      await dispatch(addOrUpdateProduct({ product }));
    }
    handleClose();
  };

  const handleClose = () => {
    dispatch(resetProductsCurrentPage());  // Reset to the first page
    dispatch(setProductsSort({sort: 'desc'}));  // Resets sorting
    dispatch(setProductsSortby({sortby: 'createdAt'}));  // Resets sorting
    dispatch(fetchProducts({limit: 10, offset: 0, sort: 'desc', sortby: 'createdAt'}));
    dispatch(setProductsModalOpen(false));    
    dispatch(setProductsIsCloning(false));
    dispatch(setProductsIsEditing(false))
    // setNewResponsibles([{ id: '', firstName: '', lastName: '', role: '' }]);
    // setNewProduct({ id: '', name: '', createdAt: '',  startsAt: '', endsAt: '' });
  };

  // const addResponsible = (_e: React.MouseEvent<HTMLButtonElement>) => {
  //   // setNewResponsibles([...newResponsibles, { id: '', firstName: '', lastName: '', role: '' }]);
  //   dispatch(setProductsCurrentProduct(...productsCurrentProduct, /* responsible here */))
  // };

  const addResponsible = (_e: React.MouseEvent<HTMLButtonElement>) => {
    if (productsCurrentProduct) {
      const updatedResponsibles = [
        ...(productsCurrentProduct.responsibles || []), 
        { id: '', firstName: '', lastName: '', role: '' }
      ];
      dispatch(setProductsCurrentProduct({ ...productsCurrentProduct, responsibles: updatedResponsibles }));
    }
  };

  // const removeResponsible = (index: number, _e: React.MouseEvent<HTMLButtonElement>) => {
  //   if (newResponsibles.length === 1) {
  //     setNewResponsibles([{ id: '', firstName: '', lastName: '', role: '' }]);
  //   } else {
  //     setNewResponsibles(newResponsibles.filter((_, i) => i !== index));
  //   }
  // };

  const removeResponsible = (index: number, _e: React.MouseEvent<HTMLButtonElement>) => {
    if (productsCurrentProduct) {
      const updatedResponsibles = productsCurrentProduct.responsibles?.length === 1 
        ? [{ id: '', firstName: '', lastName: '', role: '' }]
        : productsCurrentProduct.responsibles?.filter((_, i) => i !== index) || [];
      dispatch(setProductsCurrentProduct({ ...productsCurrentProduct, responsibles: updatedResponsibles }));
    }
  };

  const handleResponsibleChange = (index: number, field: keyof IResponsible, value: string) => {
    if (productsCurrentProduct) {
      const updatedResponsibles = productsCurrentProduct.responsibles?.map((resp, i) => 
        i === index ? { ...resp, [field]: value } : resp
      ) || [];
      dispatch(setProductsCurrentProduct({ ...productsCurrentProduct, responsibles: updatedResponsibles }));
    }
  };

  const formatDate = (dateString: string) => {
    if (dateString) {
      const date = new Date(dateString);
      return new Date(date.getTime() - (date.getTimezoneOffset() * 60000))
        .toISOString()
        .split("T")[0];
    } else {
      return new Date()
    }
  };

  const modalHeader = productsIsCloning ? 'Clone Product' : productsIsEditing ? 'Edit Product' : 'Add Product';
  const submitButtonText = productsIsCloning ? 'Clone' : productsIsEditing ? 'Edit' : 'Add';

  // tsx
  return (
    <Modal open={productsModalOpen} onClose={() => setProductsModalOpen(false)} dimmer="blurring">
      <Modal.Header>
        {modalHeader}
      </Modal.Header>
      <Modal.Content>
        <Form onSubmit={handleSubmit}>
          <Form.Input
            required
            autoFocus
            label="Name"
            placeholder="Product Name"
            // value={newProduct.name}
            value={productsCurrentProduct?.name || ''}
            onChange={(e) => handleInputChange(e, 'name')}
          />
          <Form.TextArea
            label="Description"
            placeholder="Description"
            // value={newProduct.description || ''}
            value={productsCurrentProduct?.description || ''}
            onChange={(_e, data) => dispatch(setProductsCurrentProduct({ ...productsCurrentProduct!, description: data.value as string }))}
            // onChange={(_e, data) => setNewProduct({ ...newProduct, description: data.value as string })}
          />
          <div className='field'>
            <label>Responsible(s)</label>
            {/* {newResponsibles.map((responsible, index) => ( */}
            {productsCurrentProduct?.responsibles?.map((responsible, index) => (
              <Form.Group width='equal' key={index}
>
                <Form.Input
                  placeholder="First Name"
                  value={responsible.firstName}
                  onChange={(e:any, _data:any) => handleResponsibleChange(index, 'firstName', e.target.value as string)}
                />
                <Form.Input
                  placeholder="Last Name"
                  value={responsible.lastName}
                  onChange={(e:any, _data:any) => handleResponsibleChange(index, 'lastName', e.target.value as string)}
                />
                <Form.Input
                  placeholder="Role"
                  value={responsible.role || ''}
                  onChange={(e:any, _data:any) => handleResponsibleChange(index, 'role', e.target.value as string)}
                />
                <Button type='button' circular icon='times' onClick={(e) => removeResponsible(index, e)}/>
              </Form.Group>
            ))}
          </div>
          <Button type='button' style={{marginBottom: '20px'}} onClick={(e) => addResponsible(e)}>+ Add Responsible</Button>

          <Form.Input
            type="date"
            label="Product start"
            // value={formatDate(newProduct.startsAt || '') }
            value={formatDate(productsCurrentProduct?.startsAt || '') }
            onChange={(e) => handleInputChange(e, 'startsAt')}
          />
          <Form.Input
            type="date"
            label="Product end"
            // value={formatDate(newProduct.endsAt || '')}
            value={formatDate(productsCurrentProduct?.endsAt || '') }
            onChange={(e) => handleInputChange(e, 'endsAt')}
            min={formatDate(productsCurrentProduct?.startsAt || '')} // Enforce that endsAt date cannot be before startsAt
          />
          <Form.Group className="form-button-group">
            <Form.Button primary type='submit'>{submitButtonText}</Form.Button>
            <Form.Button className="cancel-button" onClick={handleClose}>Cancel</Form.Button>
          </Form.Group>
        </Form>
      </Modal.Content>
    </Modal>
  )
}

export default ProductsModal;