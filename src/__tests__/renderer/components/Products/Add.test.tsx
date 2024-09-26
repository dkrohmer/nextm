import { render, screen, fireEvent } from '@testing-library/react';
import { jest } from '@jest/globals';
import {
  setProductsCurrentProduct,
  setProductsIsEditing,
  setProductsModalOpen,
} from '../../../../renderer/store/products';
import Add from '../../../../renderer/components/Products/Add';
import '@testing-library/jest-dom';

const mockDispatch = jest.fn();

jest.mock('react-redux', () => ({
  useDispatch: () => mockDispatch,
}));

jest.mock('../../../../renderer/store/products', () => ({
  setProductsCurrentProduct: jest.fn(),
  setProductsIsEditing: jest.fn(),
  setProductsModalOpen: jest.fn(),
}));

describe('Add Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the Add Product button', () => {
    render(<Add />);

    const addButton = screen.getByText('+ Add Product');
    expect(addButton).toBeInTheDocument();
  });

  it('dispatches the correct actions when Add Product button is clicked', () => {
    render(<Add />);

    const addButton = screen.getByText('+ Add Product');
    fireEvent.click(addButton);

    expect(mockDispatch).toHaveBeenCalledWith(
      setProductsCurrentProduct({
        id: '',
        name: '',
        startsAt: '',
        endsAt: '',
        createdAt: '',
      }),
    );

    expect(mockDispatch).toHaveBeenCalledWith(setProductsModalOpen(true));
    expect(mockDispatch).toHaveBeenCalledWith(setProductsIsEditing(false));
  });
});
