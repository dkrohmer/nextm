import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Products from '../../../../renderer/components/Products'; // Adjust the import path if necessary

// Mock the useFetchProducts hook
jest.mock('../../../../renderer/hooks/useFetchProducts', () => jest.fn());

// Mock the subcomponents used in Products
jest.mock('../../../../renderer/components/Products/Breadcrumbs', () => jest.fn(() => <div data-testid="breadcrumbs" />));
jest.mock('../../../../renderer/components/Products/Modal', () => jest.fn(() => <div data-testid="modal" />));
jest.mock('../../../../renderer/components/Products/Table', () => jest.fn(() => <div data-testid="table" />));
jest.mock('../../../../renderer/components/Products/Filters', () => jest.fn(() => <div data-testid="filters" />));
jest.mock('../../../../renderer/components/Products/Add', () => jest.fn(() => <div data-testid="add" />));
jest.mock('../../../../renderer/components/Products/Pagination', () => jest.fn(() => <div data-testid="pagination" />));
jest.mock('../../../../renderer/components/Products/ItemsPerPage', () => jest.fn(() => <div data-testid="items-per-page" />));
jest.mock('../../../../renderer/components/Products/ConfirmDelete', () => jest.fn(() => <div data-testid="confirm-delete" />));

describe('Products Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders all subcomponents correctly', () => {
    render(<Products />);

    // Check if Breadcrumbs is rendered
    expect(screen.getByTestId('breadcrumbs')).toBeInTheDocument();

    // Check if Filters and Add components are rendered
    expect(screen.getByTestId('filters')).toBeInTheDocument();
    expect(screen.getByTestId('add')).toBeInTheDocument();

    // Check if the Table is rendered
    expect(screen.getByTestId('table')).toBeInTheDocument();

    // Check if Pagination and ItemsPerPage are rendered
    expect(screen.getByTestId('pagination')).toBeInTheDocument();
    expect(screen.getByTestId('items-per-page')).toBeInTheDocument();

    // Check if ConfirmDelete and Modal are rendered
    expect(screen.getByTestId('confirm-delete')).toBeInTheDocument();
    expect(screen.getByTestId('modal')).toBeInTheDocument();
  });

  it('calls useFetchProducts hook on render', () => {
    const mockUseFetchProducts = require('../../../../renderer/hooks/useFetchProducts');
    render(<Products />);

    // Ensure the hook is called when the component is rendered
    expect(mockUseFetchProducts).toHaveBeenCalled();
  });
});
