import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ModalResponsibleRole from '../../../../renderer/components/Products/ModalResponsibleRole'; // Adjust the import path if necessary
import { setProductsCurrentProduct } from '../../../../renderer/store/products';
import { useDispatch, useSelector } from 'react-redux';
import { jest } from '@jest/globals';
import { IResponsible } from '../../../../renderer/interfaces/IResponsible';

// Mock useDispatch and useSelector hooks
const mockDispatch = jest.fn();
const mockUseSelector = jest.fn();

jest.mock('react-redux', () => ({
  useDispatch: () => mockDispatch,
  useSelector: (selector: any) => mockUseSelector(selector),
}));

describe('ModalResponsibleRole Component', () => {
  const responsible1: IResponsible = {
    id: '1',
    firstName: 'John',
    lastName: 'Doe',
    role: 'Manager',
  };

  const responsible2: IResponsible = {
    id: '2',
    firstName: 'Alice',
    lastName: 'Smith',
    role: 'Engineer',
  };

  const emptyResponsible: IResponsible = {
    id: '',
    firstName: '',
    lastName: '',
    role: '',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the input with the current responsible role', () => {
    // Mock the global state with productsCurrentProduct
    mockUseSelector.mockImplementation((selector: any) => selector({
      products: {
        productsCurrentProduct: {
          id: '1',
          name: 'Test Product',
          createdAt: '1',
          responsibles: [responsible1, responsible2],
        },
      },
    }));

    render(<ModalResponsibleRole index={0} responsible={responsible1} />);

    // Check if input field renders with the correct value using placeholder
    const inputElement = screen.getByPlaceholderText('Role');
    expect(inputElement).toHaveValue('Manager');
  });

  it('renders the input with an empty value when responsible role is empty', () => {
    // Mock the global state with productsCurrentProduct where responsible has no role
    mockUseSelector.mockImplementation((selector: any) => selector({
      products: {
        productsCurrentProduct: {
          id: '1',
          name: 'Test Product',
          createdAt: '1',
          responsibles: [emptyResponsible],
        },
      },
    }));

    render(<ModalResponsibleRole index={0} responsible={emptyResponsible} />);

    // Check if input field renders with an empty value using placeholder
    const inputElement = screen.getByPlaceholderText('Role');
    expect(inputElement).toHaveValue('');
  });

  it('dispatches setProductsCurrentProduct action on input change', () => {
    // Mock the global state with productsCurrentProduct
    mockUseSelector.mockImplementation((selector: any) => selector({
      products: {
        productsCurrentProduct: {
          id: '1',
          name: 'Test Product',
          createdAt: '1',
          responsibles: [responsible1, responsible2],
        },
      },
    }));

    render(<ModalResponsibleRole index={0} responsible={responsible1} />);

    // Simulate input change
    const inputElement = screen.getByPlaceholderText('Role');
    fireEvent.change(inputElement, { target: { value: 'Director' } });

    // Ensure the dispatch updates only the correct responsible's role
    expect(mockDispatch).toHaveBeenCalledWith(
      setProductsCurrentProduct({
        id: '1',
        name: 'Test Product',
        createdAt: '1',
        responsibles: [
          { ...responsible1, role: 'Director' }, // First responsible updated
          responsible2, // Second responsible unchanged
        ],
      })
    );
  });

  it('truncates the role to 249 characters if it exceeds 250', () => {
    mockUseSelector.mockImplementation((selector: any) => selector({
      products: {
        productsCurrentProduct: {
          id: '1',
          name: 'Test Product',
          createdAt: '1',
          responsibles: [{ id: '1', firstName: 'John', lastName: 'Doe', role: 'Manager' }],
        },
      },
    }));
  
    render(<ModalResponsibleRole index={0} responsible={{ id: '1', firstName: 'John', lastName: 'Doe', role: 'Manager' }} />);
  
    const longInputValue = 'A'.repeat(260);
    const inputElement = screen.getByPlaceholderText('Role');
  
    fireEvent.change(inputElement, { target: { value: longInputValue } });
  
    expect(mockDispatch).toHaveBeenCalledWith(
      setProductsCurrentProduct({
        id: '1',
        name: 'Test Product',
        createdAt: '1',
        responsibles: [
          { id: '1', firstName: 'John', lastName: 'Doe', role: 'A'.repeat(249) },
        ],
      })
    );
  });
});
