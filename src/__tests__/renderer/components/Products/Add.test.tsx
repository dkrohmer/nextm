import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { jest } from '@jest/globals';
import Add from '../../../../renderer/components/Products/Add';
import {
  setProductsCurrentProduct,
  setProductsIsEditing,
  setProductsModalOpen,
} from '../../../../renderer/store/products';

// Mock useDispatch hook
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

    // Check if the button is rendered with the correct label
    const addButton = screen.getByText('+ Add Product');
    expect(addButton).toBeInTheDocument();
  });

  it('dispatches the correct actions when Add Product button is clicked', () => {
    render(<Add />);

    // Simulate clicking the Add Product button
    const addButton = screen.getByText('+ Add Product');
    fireEvent.click(addButton);

    // Verify that setProductsCurrentProduct action was dispatched with the correct payload
    expect(mockDispatch).toHaveBeenCalledWith(
      setProductsCurrentProduct({
        id: '',
        name: '',
        startsAt: '',
        endsAt: '',
        createdAt: '',
      }),
    );

    // Verify that setProductsModalOpen was dispatched with true
    expect(mockDispatch).toHaveBeenCalledWith(setProductsModalOpen(true));

    // Verify that setProductsIsEditing was dispatched with false
    expect(mockDispatch).toHaveBeenCalledWith(setProductsIsEditing(false));
  });
});
