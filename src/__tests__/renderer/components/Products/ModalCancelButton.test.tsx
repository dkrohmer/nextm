import { render, screen, fireEvent } from '@testing-library/react';
import { jest } from '@jest/globals';
import { fetchProducts } from '../../../../renderer/services/api/products';
import {
  resetProductsCurrentPage,
  setProductsIsCloning,
  setProductsIsEditing,
  setProductsModalOpen,
  setProductsSort,
  setProductsSortby,
} from '../../../../renderer/store/products';
import ModalCancelButton from '../../../../renderer/components/Products/ModalCancelButton';
import '@testing-library/jest-dom';

const mockDispatch = jest.fn();
jest.mock('react-redux', () => ({
  useDispatch: () => mockDispatch,
}));

jest.mock('../../../../renderer/services/api/products', () => ({
  fetchProducts: jest.fn(),
}));

describe('ModalCancelButton Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('dispatches correct actions on click', () => {
    render(<ModalCancelButton />);

    fireEvent.click(screen.getByText('Cancel'));

    expect(mockDispatch).toHaveBeenCalledWith(resetProductsCurrentPage());
    expect(mockDispatch).toHaveBeenCalledWith(setProductsSort({ sort: 'desc' }),);
    expect(mockDispatch).toHaveBeenCalledWith(setProductsSortby({ sortby: 'createdAt' }),);
    expect(mockDispatch).toHaveBeenCalledWith(fetchProducts({ limit: 10, offset: 0, sort: 'desc', sortby: 'createdAt' }));
    expect(mockDispatch).toHaveBeenCalledWith(setProductsModalOpen(false));
    expect(mockDispatch).toHaveBeenCalledWith(setProductsIsCloning(false));
    expect(mockDispatch).toHaveBeenCalledWith(setProductsIsEditing(false));
  });
});
