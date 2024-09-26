import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ConfirmDelete from '../../../../renderer/components/Products/ConfirmDelete';
import { deleteProduct } from '../../../../renderer/services/api/products';
import {
  setOpenConfirm,
  setProductToDelete,
  setProductsCurrentPage,
} from '../../../../renderer/store/products';

// Mocking useDispatch, useSelector, and useNavigate hooks
const mockDispatch = jest.fn();
const mockUseSelector = jest.fn();
const mockNavigate = jest.fn();

jest.mock('react-redux', () => ({
  useDispatch: () => mockDispatch,
  useSelector: (selector: any) => mockUseSelector(selector),
}));

jest.mock('react-router-dom', () => ({
  useNavigate: () => mockNavigate,
}));

// Mock deleteProduct API call
jest.mock('../../../../renderer/services/api/products', () => ({
  deleteProduct: jest.fn(),
}));

describe('ConfirmDelete Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the Confirm dialog when openConfirm is true', () => {
    // Mock useSelector to return openConfirm as true and productToDelete
    mockUseSelector.mockImplementation((selector: any) =>
      selector({
        products: { openConfirm: true, productToDelete: '123', products: [] },
      }),
    );

    // Render the ConfirmDelete component
    render(<ConfirmDelete />);

    // Check if the Confirm dialog is rendered
    expect(
      screen.getByText(/Deleting a product will permanently delete/i),
    ).toBeInTheDocument();
  });

  it('does not render the Confirm dialog when openConfirm is false', () => {
    // Mock useSelector to return openConfirm as false
    mockUseSelector.mockImplementation((selector: any) =>
      selector({
        products: { openConfirm: false, productToDelete: null, products: [] },
      }),
    );

    // Render the ConfirmDelete component
    render(<ConfirmDelete />);

    // Check if the Confirm dialog is not rendered
    expect(
      screen.queryByText(/Deleting a product will permanently delete/i),
    ).not.toBeInTheDocument();
  });

  it('handles confirm action correctly', () => {
    // Mock useSelector to return product details for deletion
    mockUseSelector.mockImplementation((selector: any) =>
      selector({
        products: {
          openConfirm: true,
          productToDelete: '123',
          productsCurrentPage: 2,
          productsItemsPerPage: 10,
          productsSort: 'name',
          productsSortby: 'asc',
          products: { products: {}, productsCount: 0 }, // Mock at least one product
        },
      }),
    );

    render(<ConfirmDelete />);

    // Simulate clicking the confirm button
    fireEvent.click(screen.getByText('OK'));

    // Ensure the deleteProduct action is dispatched
    expect(mockDispatch).toHaveBeenCalledWith(
      deleteProduct({
        productId: '123',
        limit: 10,
        offset: 10, // currentPage - 1 * itemsPerPage = (2 - 1) * 10 = 10
        sort: 'name',
        sortby: 'asc',
      }),
    );

    // Ensure the setProductToDelete action is dispatched with null
    expect(mockDispatch).toHaveBeenCalledWith(setProductToDelete(null));

    // Ensure the setOpenConfirm action is dispatched with false to close the dialog
    expect(mockDispatch).toHaveBeenCalledWith(setOpenConfirm(false));
  });

  it('handles cancel action correctly', () => {
    // Mock useSelector to return openConfirm as true
    mockUseSelector.mockImplementation((selector: any) =>
      selector({
        products: { openConfirm: true, productToDelete: '123', products: [] },
      }),
    );

    render(<ConfirmDelete />);

    // Simulate clicking the cancel button
    fireEvent.click(screen.getByText('Cancel'));

    // Ensure the setOpenConfirm action is dispatched with false to close the dialog
    expect(mockDispatch).toHaveBeenCalledWith(setOpenConfirm(false));
  });

  it('handles confirm action correctly when there is only one product on the page', () => {
    // Mock useSelector to return product details for deletion with one product on the current page
    mockUseSelector.mockImplementation((selector: any) =>
      selector({
        products: {
          openConfirm: true,
          productToDelete: '123',
          productsCurrentPage: 2, // Set current page to 2 so that offset is not zero
          productsItemsPerPage: 10,
          productsSort: 'name',
          productsSortby: 'asc',
          products: { products: [{ id: '123' }], productsCount: 1 }, // Only one product
        },
      }),
    );

    render(<ConfirmDelete />);

    // Simulate clicking the confirm button
    fireEvent.click(screen.getByText('OK'));

    // Ensure the deleteProduct action is dispatched
    expect(mockDispatch).toHaveBeenCalledWith(
      deleteProduct({
        productId: '123',
        limit: 10,
        offset: 0, // After reducing offset, it should be 0
        sort: 'name',
        sortby: 'asc',
      }),
    );

    // Ensure the setProductsCurrentPage action is dispatched to decrement the page
    expect(mockDispatch).toHaveBeenCalledWith(setProductsCurrentPage(1)); // Page should decrement from 2 to 1

    // Ensure the setProductToDelete action is dispatched with null
    expect(mockDispatch).toHaveBeenCalledWith(setProductToDelete(null));

    // Ensure the setOpenConfirm action is dispatched with false to close the dialog
    expect(mockDispatch).toHaveBeenCalledWith(setOpenConfirm(false));
  });
});
