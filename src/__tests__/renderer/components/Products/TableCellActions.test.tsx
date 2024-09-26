import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import TableCellActions from '../../../../renderer/components/Products/TableCellActions'; // Adjust the import path if necessary
import { IProduct } from '../../../../renderer/interfaces/IProduct';

// Mock child components
jest.mock(
  '../../../../renderer/components/Products/TableCellActionsEdit',
  () =>
    function ({ product }: { product: IProduct }) {
      return <div data-testid={`edit-action-${product.id}`}>Edit</div>;
    },
);
jest.mock(
  '../../../../renderer/components/Products/TableCellActionsClone',
  () =>
    function ({ product }: { product: IProduct }) {
      return <div data-testid={`clone-action-${product.id}`}>Clone</div>;
    },
);
jest.mock(
  '../../../../renderer/components/Products/TableCellActionsDelete',
  () =>
    function ({ product }: { product: IProduct }) {
      return <div data-testid={`delete-action-${product.id}`}>Delete</div>;
    },
);

describe('TableCellActions Component', () => {
  const product: IProduct = {
    id: '1',
    name: 'Product 1',
    createdAt: '2023-01-01',
    description: 'Test product description',
    startsAt: '2023-01-01',
    endsAt: '2023-12-31',
    responsibles: [],
  };

  it('renders the edit, clone, and delete actions for the product', () => {
    render(<TableCellActions product={product} />);

    // Check if the Edit, Clone, and Delete components are rendered
    expect(screen.getByTestId('edit-action-1')).toBeInTheDocument();
    expect(screen.getByTestId('edit-action-1')).toHaveTextContent('Edit');

    expect(screen.getByTestId('clone-action-1')).toBeInTheDocument();
    expect(screen.getByTestId('clone-action-1')).toHaveTextContent('Clone');

    expect(screen.getByTestId('delete-action-1')).toBeInTheDocument();
    expect(screen.getByTestId('delete-action-1')).toHaveTextContent('Delete');
  });
});
