import { render, screen } from '@testing-library/react';
import Table from '../../../../renderer/components/Products/Table';
import '@testing-library/jest-dom';

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

    const semanticTable = screen.getByRole('table');
    expect(semanticTable).toBeInTheDocument();

    const headers = screen.getByTestId('table-headers');
    expect(headers).toBeInTheDocument();

    const body = screen.getByTestId('table-body');
    expect(body).toBeInTheDocument();
  });
});
