import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ModalCancelButton from '../../../../renderer/components/Products/ModalCancelButton';
import { resetProductsCurrentPage, setProductsIsCloning, setProductsIsEditing, setProductsModalOpen, setProductsSort, setProductsSortby } from '../../../../renderer/store/products';
import { fetchProducts } from '../../../../renderer/services/api/products';
import { jest } from '@jest/globals';

// Mock the useDispatch hook
const mockDispatch = jest.fn();
jest.mock('react-redux', () => ({
  useDispatch: () => mockDispatch,
}));

// Mock the API call
jest.mock('../../../../renderer/services/api/products', () => ({
  fetchProducts: jest.fn(),
}));

describe('ModalCancelButton Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('dispatches correct actions on click', () => {
    // Render the component
    render(<ModalCancelButton />);

    // Simulate button click
    fireEvent.click(screen.getByText('Cancel'));

    // Check if dispatch is called with the correct actions
    expect(mockDispatch).toHaveBeenCalledWith(resetProductsCurrentPage());
    expect(mockDispatch).toHaveBeenCalledWith(setProductsSort({ sort: 'desc' }));
    expect(mockDispatch).toHaveBeenCalledWith(setProductsSortby({ sortby: 'createdAt' }));
    expect(mockDispatch).toHaveBeenCalledWith(
      fetchProducts({
        limit: 10,
        offset: 0,
        sort: 'desc',
        sortby: 'createdAt',
      })
    );
    expect(mockDispatch).toHaveBeenCalledWith(setProductsModalOpen(false));
    expect(mockDispatch).toHaveBeenCalledWith(setProductsIsCloning(false));
    expect(mockDispatch).toHaveBeenCalledWith(setProductsIsEditing(false));
  });
});
