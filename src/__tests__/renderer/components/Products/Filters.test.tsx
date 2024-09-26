import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Filters from '../../../../renderer/components/Products/Filters'; // Adjust the import path if necessary
import {
  setProductsSortby,
  toggleProductsSort,
} from '../../../../renderer/store/products';

// Mock useDispatch and useSelector hooks
const mockDispatch = jest.fn();
const mockUseSelector = jest.fn();

jest.mock('react-redux', () => ({
  useDispatch: () => mockDispatch,
  useSelector: (selector: any) => mockUseSelector(selector),
}));

// Mock the actions
jest.mock('../../../../renderer/store/products', () => ({
  setProductsSortby: jest.fn(),
  toggleProductsSort: jest.fn(),
}));

describe('Filters Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the dropdown and button when productsSortby and productsSort are present', () => {
    // Mock useSelector to return the desired state
    mockUseSelector.mockImplementation((selector: any) =>
      selector({
        products: {
          productsSort: 'asc',
          productsSortby: 'name',
        },
      }),
    );

    render(<Filters />);

    // Check if the Dropdown is rendered
    const dropdown = screen.getByTestId('sort-dropdown');
    expect(dropdown).toBeInTheDocument();

    // Check if the Button is rendered
    const button = screen.getByTestId('sort-direction-button');
    expect(button).toBeInTheDocument();
  });

  it('dispatches setProductsSortby action when the dropdown value is changed', () => {
    // Mock useSelector to return the initial state
    mockUseSelector.mockImplementation((selector: any) =>
      selector({
        products: {
          productsSort: 'asc',
          productsSortby: 'name',
        },
      }),
    );

    render(<Filters />);

    // Simulate opening the dropdown
    fireEvent.click(screen.getByTestId('sort-dropdown'));

    // Simulate selecting an option
    const option = screen.getByText('Created at');
    fireEvent.click(option);

    // Check if setProductsSortby action is dispatched with the correct value
    expect(mockDispatch).toHaveBeenCalledWith(
      setProductsSortby({ sortby: 'createdAt' }),
    );
  });

  it('dispatches toggleProductsSort action when the button is clicked', () => {
    // Mock useSelector to return the desired state
    mockUseSelector.mockImplementation((selector: any) =>
      selector({
        products: {
          productsSort: 'asc',
          productsSortby: 'name',
        },
      }),
    );

    render(<Filters />);

    // Simulate clicking the sort direction button
    const button = screen.getByTestId('sort-direction-button');
    fireEvent.click(button);

    // Check if toggleProductsSort action is dispatched
    expect(mockDispatch).toHaveBeenCalledWith(toggleProductsSort());
  });

  it('renders the down arrow icon when the sort direction is descending', () => {
    // Mock useSelector to return the descending sort state
    mockUseSelector.mockImplementation((selector: any) =>
      selector({
        products: {
          productsSort: 'desc',
          productsSortby: 'name',
        },
      }),
    );

    render(<Filters />);

    // Check if the down arrow icon is rendered
    const sortIcon = screen.getByTestId('sort-icon');
    expect(sortIcon).toHaveClass('long arrow alternate down');
  });
});
