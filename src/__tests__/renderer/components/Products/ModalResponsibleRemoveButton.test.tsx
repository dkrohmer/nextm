import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useDispatch, useSelector } from 'react-redux';
import { jest } from '@jest/globals';
import ModalResponsibleRemoveButton from '../../../../renderer/components/Products/ModalResponsibleRemoveButton'; // Adjust the import path if necessary
import { setProductsCurrentProduct } from '../../../../renderer/store/products';
import { IResponsible } from '../../../../renderer/interfaces/IResponsible';

// Mock useDispatch and useSelector hooks
const mockDispatch = jest.fn();
const mockUseSelector = jest.fn();

jest.mock('react-redux', () => ({
  useDispatch: () => mockDispatch,
  useSelector: (selector: any) => mockUseSelector(selector),
}));

describe('ModalResponsibleRemoveButton Component', () => {
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

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('removes the correct responsible on button click', () => {
    // Mock the global state with productsCurrentProduct containing two responsibles
    mockUseSelector.mockImplementation((selector: any) =>
      selector({
        products: {
          productsCurrentProduct: {
            id: '1',
            name: 'Test Product',
            createdAt: '1',
            responsibles: [responsible1, responsible2],
          },
        },
      }),
    );

    render(<ModalResponsibleRemoveButton index={0} />);

    // Simulate button click to remove the first responsible
    const removeButton = screen.getByRole('button');
    fireEvent.click(removeButton);

    // Ensure the dispatch updates the state by removing the first responsible
    expect(mockDispatch).toHaveBeenCalledWith(
      setProductsCurrentProduct({
        id: '1',
        name: 'Test Product',
        createdAt: '1',
        responsibles: [responsible2], // Only the second responsible remains
      }),
    );
  });

  it('handles removal of all responsibles and sets an empty array', () => {
    // Mock the global state with productsCurrentProduct containing only one responsible
    mockUseSelector.mockImplementation((selector: any) =>
      selector({
        products: {
          productsCurrentProduct: {
            id: '1',
            name: 'Test Product',
            createdAt: '1',
            responsibles: [responsible1],
          },
        },
      }),
    );

    render(<ModalResponsibleRemoveButton index={0} />);

    // Simulate button click to remove the only responsible
    const removeButton = screen.getByRole('button');
    fireEvent.click(removeButton);

    // Ensure the dispatch updates the state with an empty responsibles array
    expect(mockDispatch).toHaveBeenCalledWith(
      setProductsCurrentProduct({
        id: '1',
        name: 'Test Product',
        createdAt: '1',
        responsibles: [], // All responsibles removed, setting an empty array
      }),
    );
  });

  it('handles undefined responsibles array and sets an empty array', () => {
    // Mock the global state with productsCurrentProduct having undefined responsibles
    mockUseSelector.mockImplementation((selector: any) =>
      selector({
        products: {
          productsCurrentProduct: {
            id: '1',
            name: 'Test Product',
            createdAt: '1',
            responsibles: undefined,
          },
        },
      }),
    );

    render(<ModalResponsibleRemoveButton index={0} />);

    // Simulate button click
    const removeButton = screen.getByRole('button');
    fireEvent.click(removeButton);

    // Ensure the dispatch updates the state with an empty responsibles array
    expect(mockDispatch).toHaveBeenCalledWith(
      setProductsCurrentProduct({
        id: '1',
        name: 'Test Product',
        createdAt: '1',
        responsibles: [], // Responsibles undefined, fallback to empty array
      }),
    );
  });

  it('does nothing if productsCurrentProduct is undefined', () => {
    // Mock the global state with productsCurrentProduct being undefined
    mockUseSelector.mockImplementation((selector: any) =>
      selector({
        products: {
          productsCurrentProduct: undefined,
        },
      }),
    );

    render(<ModalResponsibleRemoveButton index={0} />);

    // Simulate button click
    const removeButton = screen.getByRole('button');
    fireEvent.click(removeButton);

    // Ensure dispatch is not called since productsCurrentProduct is undefined
    expect(mockDispatch).not.toHaveBeenCalled();
  });
});
