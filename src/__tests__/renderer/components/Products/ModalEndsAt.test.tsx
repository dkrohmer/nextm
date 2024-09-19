import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ModalEndsAt from '../../../../renderer/components/Products/ModalEndsAt'; // Adjust the import path if necessary
import { setProductsCurrentProduct } from '../../../../renderer/store/products';
import { useDispatch, useSelector } from 'react-redux';
import { jest } from '@jest/globals';
import { formatDate } from '../../../../renderer/utils/formatters';

// Mock useDispatch and useSelector hooks
const mockDispatch = jest.fn();
const mockUseSelector = jest.fn();

jest.mock('react-redux', () => ({
  useDispatch: () => mockDispatch,
  useSelector: (selector: any) => mockUseSelector(selector),
}));

jest.mock('../../../../renderer/utils/formatters', () => ({
  formatDate: jest.fn((date) => date || ''),
}));

describe('ModalEndsAt Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the input with the current product endsAt date', () => {
    // Set up the mock to return a non-null productsCurrentProduct
    mockUseSelector.mockImplementation((selector: any) => selector({
      products: {
        productsCurrentProduct: { id: '1', name: 'Test Product', endsAt: '2023-12-01', startsAt: '2023-01-01' },
      }
    }));

    render(<ModalEndsAt />);

    // Access the input element directly within the div with the data-testid
    const inputElement = screen.getByTestId('product-ends-at-input').querySelector('input');
    
    // Ensure input is found and check its value
    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveValue('2023-12-01');
  });

  it('renders the input with an empty value when productsCurrentProduct is null', () => {
    // Set up the mock to return a null productsCurrentProduct
    mockUseSelector.mockImplementation((selector: any) => selector({
      products: {
        productsCurrentProduct: null,
      }
    }));

    render(<ModalEndsAt />);

    // Access the input element directly within the div with the data-testid
    const inputElement = screen.getByTestId('product-ends-at-input').querySelector('input');
    
    // Ensure input is found and check its value is empty
    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveValue('');
  });

  it('dispatches setProductsCurrentProduct action on input change', () => {
    // Set up the mock to return a non-null productsCurrentProduct
    mockUseSelector.mockImplementation((selector: any) => selector({
      products: {
        productsCurrentProduct: { id: '1', name: 'Test Product', endsAt: '2023-12-01', startsAt: '2023-01-01', createdAt: '1' },
      }
    }));

    render(<ModalEndsAt />);

    // Access the input element directly within the div with the data-testid
    const inputElement = screen.getByTestId('product-ends-at-input').querySelector('input');
    
    // Simulate input change
    fireEvent.change(inputElement!, { target: { value: '2024-01-01' } });

    // Check if dispatch is called with the correct action
    expect(mockDispatch).toHaveBeenCalledWith(
      setProductsCurrentProduct({
        id: '1',
        name: 'Test Product',
        endsAt: '2024-01-01',
        startsAt: '2023-01-01',
        createdAt: '1'
      })
    );
  });

  it('sets value to null when input is cleared', () => {
    // Set up the mock to return a non-null productsCurrentProduct
    mockUseSelector.mockImplementation((selector: any) => selector({
      products: {
        productsCurrentProduct: { id: '1', name: 'Test Product', endsAt: '2023-12-01', startsAt: '2023-01-01', createdAt: '1' },
      }
    }));

    render(<ModalEndsAt />);

    // Access the input element directly within the div with the data-testid
    const inputElement = screen.getByTestId('product-ends-at-input').querySelector('input');

    // Simulate clearing the input (empty string)
    fireEvent.change(inputElement!, { target: { value: '' } });

    // Check if dispatch is called with the correct action and value set to null
    expect(mockDispatch).toHaveBeenCalledWith(
      setProductsCurrentProduct({
        id: '1',
        name: 'Test Product',
        endsAt: null,
        startsAt: '2023-01-01',
        createdAt: '1'
      })
    );
  });
});
