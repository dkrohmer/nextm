import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ModalName from '../../../../renderer/components/Products/ModalName';
import { setProductsCurrentProduct } from '../../../../renderer/store/products';
import { useDispatch, useSelector } from 'react-redux';
import { jest } from '@jest/globals';

// Mock useDispatch and useSelector hooks
const mockDispatch = jest.fn();
const mockUseSelector = jest.fn();

jest.mock('react-redux', () => ({
  useDispatch: () => mockDispatch,
  useSelector: (selector: any) => mockUseSelector(selector),
}));

describe('ModalName Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the input with the current product name', () => {
    // Set up the mock to return a non-null productsCurrentProduct
    mockUseSelector.mockImplementation((selector: any) => selector({
      products: {
        productsCurrentProduct: { id: '1', name: 'Old Product Name', createdAt: '1' },
      }
    }));

    render(<ModalName />);

    // Check if input field renders with the correct value
    const inputElement = screen.getByPlaceholderText('Product Name');
    expect(inputElement).toHaveValue('Old Product Name');
  });

  it('renders the input with an empty value when productsCurrentProduct is null', () => {
    // Set up the mock to return a null productsCurrentProduct
    mockUseSelector.mockImplementation((selector: any) => selector({
      products: {
        productsCurrentProduct: null,
      }
    }));

    render(<ModalName />);

    // Check if input field renders with an empty value
    const inputElement = screen.getByPlaceholderText('Product Name');
    expect(inputElement).toHaveValue('');
  });

  it('dispatches setProductsCurrentProduct action on input change', () => {
    // Set up the mock to return a non-null productsCurrentProduct
    mockUseSelector.mockImplementation((selector: any) => selector({
      products: {
        productsCurrentProduct: { id: '1', name: 'Old Product Name', createdAt: '1' },
      }
    }));

    render(<ModalName />);

    // Simulate input change
    fireEvent.change(screen.getByPlaceholderText('Product Name'), {
      target: { value: 'New Product Name' }
    });

    // Check if dispatch is called with the correct action
    expect(mockDispatch).toHaveBeenCalledWith(
      setProductsCurrentProduct({
        id: '1',
        name: 'New Product Name',
        createdAt: '1'
      })
    );
  });
});
