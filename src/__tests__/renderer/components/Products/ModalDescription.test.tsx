import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { jest } from '@jest/globals';
import ModalDescription from '../../../../renderer/components/Products/ModalDescription';
import { setProductsCurrentProduct } from '../../../../renderer/store/products';

// Mock useDispatch and useSelector hooks
const mockDispatch = jest.fn();
const mockUseSelector = jest.fn();

jest.mock('react-redux', () => ({
  useDispatch: () => mockDispatch,
  useSelector: (selector: any) => mockUseSelector(selector),
}));

describe('ModalDescription Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the text area with the current product description', () => {
    // Set up the mock to return a product description
    mockUseSelector.mockImplementation((selector: any) =>
      selector({
        products: {
          productsCurrentProduct: {
            id: '1',
            name: 'Test Product',
            description: 'Existing Product Description',
          },
        },
      }),
    );

    render(<ModalDescription />);

    // Check if text area renders with the correct value
    const textAreaElement = screen.getByPlaceholderText('Description');
    expect(textAreaElement).toHaveValue('Existing Product Description');
  });

  it('renders the text area with an empty value when description is empty', () => {
    // Set up the mock to return an empty description
    mockUseSelector.mockImplementation((selector: any) =>
      selector({
        products: {
          productsCurrentProduct: {
            id: '1',
            name: 'Test Product',
            description: '',
          },
        },
      }),
    );

    render(<ModalDescription />);

    // Check if text area renders with an empty value
    const textAreaElement = screen.getByPlaceholderText('Description');
    expect(textAreaElement).toHaveValue('');
  });

  it('dispatches setProductsCurrentProduct action on input change', () => {
    // Set up the mock to return a product description
    mockUseSelector.mockImplementation((selector: any) =>
      selector({
        products: {
          productsCurrentProduct: {
            id: '1',
            name: 'Test Product',
            description: 'Existing Product Description',
            createdAt: '1',
          },
        },
      }),
    );

    render(<ModalDescription />);

    // Simulate text area change
    fireEvent.change(screen.getByPlaceholderText('Description'), {
      target: { value: 'New Product Description' },
    });

    // Check if dispatch is called with correct action
    expect(mockDispatch).toHaveBeenCalledWith(
      setProductsCurrentProduct({
        id: '1',
        name: 'Test Product',
        description: 'New Product Description',
        createdAt: '1',
      }),
    );
  });

  it('should truncate the description to 4999 characters if it exceeds 5000 characters', () => {
    mockUseSelector.mockImplementation((selector: any) =>
      selector({
        products: {
          productsCurrentProduct: {
            id: '1',
            name: 'Test Product',
            description: 'Existing Product Description',
            createdAt: '1',
          },
        },
      }),
    );

    render(<ModalDescription />);

    const longDescription = 'A'.repeat(5100);
    fireEvent.change(screen.getByPlaceholderText('Description'), {
      target: { value: longDescription },
    });

    expect(mockDispatch).toHaveBeenCalledWith(
      setProductsCurrentProduct({
        id: '1',
        name: 'Test Product',
        description: 'A'.repeat(4999),
        createdAt: '1',
      }),
    );
  });
});
