import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ModalStartsAt from '../../../../renderer/components/Products/ModalStartsAt'; // Adjust the import path if necessary
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

describe('ModalStartsAt Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the input with the current product startsAt date', () => {
    // Set up the mock to return a non-null productsCurrentProduct
    mockUseSelector.mockImplementation((selector: any) => selector({
      products: {
        productsCurrentProduct: { id: '1', name: 'Test Product', startsAt: '2023-01-01', endsAt: '2023-12-31' },
      },
    }));

    render(<ModalStartsAt />);

    // Access the input element directly within the wrapper div with data-testid
    const inputElement = screen.getByTestId('product-starts-at-input').querySelector('input');
    
    // Ensure the input element is found and check its value
    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveValue('2023-01-01');
  });

  it('renders the input with an empty value when productsCurrentProduct is null', () => {
    // Set up the mock to return a null productsCurrentProduct
    mockUseSelector.mockImplementation((selector: any) => selector({
      products: {
        productsCurrentProduct: null,
      },
    }));

    render(<ModalStartsAt />);

    // Access the input element directly within the wrapper div with data-testid
    const inputElement = screen.getByTestId('product-starts-at-input').querySelector('input');
    
    // Ensure the input element is found and check its value is empty
    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveValue('');
  });

  it('dispatches setProductsCurrentProduct action on input change', () => {
    // Set up the mock to return a non-null productsCurrentProduct
    mockUseSelector.mockImplementation((selector: any) => selector({
      products: {
        productsCurrentProduct: { id: '1', name: 'Test Product', startsAt: '2023-01-01', endsAt: '2023-12-31', createdAt: '1' },
      },
    }));

    render(<ModalStartsAt />);

    // Access the input element directly within the wrapper div with data-testid
    const inputElement = screen.getByTestId('product-starts-at-input').querySelector('input');
    
    // Simulate input change
    fireEvent.change(inputElement!, { target: { value: '2023-02-01' } });

    // Ensure the dispatch updates the startsAt field correctly
    expect(mockDispatch).toHaveBeenCalledWith(
      setProductsCurrentProduct({
        id: '1',
        name: 'Test Product',
        startsAt: '2023-02-01',
        endsAt: '2023-12-31',
        createdAt: '1',
      })
    );
  });

  it('sets the max attribute correctly based on the endsAt date', () => {
    // Mock the productsCurrentProduct with both startsAt and endsAt
    mockUseSelector.mockImplementation((selector: any) => selector({
      products: {
        productsCurrentProduct: { id: '1', name: 'Test Product', createdAt: '1', startsAt: '2023-01-01', endsAt: '2023-12-31' },
      },
    }));

    render(<ModalStartsAt />);

    // Access the input element directly within the wrapper div with data-testid
    const inputElement = screen.getByTestId('product-starts-at-input').querySelector('input');
    
    // Ensure the max attribute is set correctly
    expect(inputElement).toHaveAttribute('max', '2023-12-31');
  });

  it('sets startsAt to null when the input is cleared', () => {
    // Mock the global state with productsCurrentProduct having a startsAt date
    mockUseSelector.mockImplementation((selector: any) => selector({
      products: {
        productsCurrentProduct: { id: '1', name: 'Test Product', createdAt: '1', startsAt: '2023-01-01', endsAt: '2023-12-31' },
      },
    }));
  
    render(<ModalStartsAt />);
  
    // Access the input element directly within the wrapper div with data-testid
    const inputElement = screen.getByTestId('product-starts-at-input').querySelector('input');
  
    // Simulate clearing the input (setting value to empty string)
    fireEvent.change(inputElement!, { target: { value: '' } });
  
    // Ensure the dispatch updates the startsAt field to null
    expect(mockDispatch).toHaveBeenCalledWith(
      setProductsCurrentProduct({
        id: '1',
        name: 'Test Product',
        createdAt: '1',
        startsAt: null,
        endsAt: '2023-12-31',
      })
    );
  });
});