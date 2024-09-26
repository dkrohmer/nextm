import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Table from '../../../../renderer/components/Products/Table'; // Adjust the import path if necessary

// Mock the TableHeaders and TableBody components
jest.mock(
  '../../../../renderer/components/Products/TableHeaders',
  () =>
    function () {
      return <thead data-testid="table-headers" />;
    },
);
jest.mock(
  '../../../../renderer/components/Products/TableBody',
  () =>
    function () {
      return <tbody data-testid="table-body" />;
    },
);

describe('Table Component', () => {
  it('renders the table with headers and body', () => {
    render(<Table />);

    // Check if the SemanticTable is rendered
    const semanticTable = screen.getByRole('table');
    expect(semanticTable).toBeInTheDocument();

    // Check if the TableHeaders is rendered inside the table
    const headers = screen.getByTestId('table-headers');
    expect(headers).toBeInTheDocument();

    // Check if the TableBody is rendered inside the table
    const body = screen.getByTestId('table-body');
    expect(body).toBeInTheDocument();
  });
});
