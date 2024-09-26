import { render, screen } from '@testing-library/react';
import Products from '../../../../renderer/components/Products';
import '@testing-library/jest-dom';

jest.mock('../../../../renderer/hooks/useFetchProducts', () => jest.fn());

jest.mock('../../../../renderer/components/Products/Breadcrumbs', () =>
  jest.fn(() => <div data-testid="breadcrumbs" />),
);
jest.mock('../../../../renderer/components/Products/Modal', () =>
  jest.fn(() => <div data-testid="modal" />),
);
jest.mock('../../../../renderer/components/Products/Table', () =>
  jest.fn(() => <div data-testid="table" />),
);
jest.mock('../../../../renderer/components/Products/Filters', () =>
  jest.fn(() => <div data-testid="filters" />),
);
jest.mock('../../../../renderer/components/Products/Add', () =>
  jest.fn(() => <div data-testid="add" />),
);
jest.mock('../../../../renderer/components/Products/Pagination', () =>
  jest.fn(() => <div data-testid="pagination" />),
);
jest.mock('../../../../renderer/components/Products/ItemsPerPage', () =>
  jest.fn(() => <div data-testid="items-per-page" />),
);
jest.mock('../../../../renderer/components/Products/ConfirmDelete', () =>
  jest.fn(() => <div data-testid="confirm-delete" />),
);

describe('Products Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders all subcomponents correctly', () => {
    render(<Products />);

    expect(screen.getByTestId('breadcrumbs')).toBeInTheDocument();
    expect(screen.getByTestId('filters')).toBeInTheDocument();
    expect(screen.getByTestId('add')).toBeInTheDocument();
    expect(screen.getByTestId('table')).toBeInTheDocument();
    expect(screen.getByTestId('pagination')).toBeInTheDocument();
    expect(screen.getByTestId('items-per-page')).toBeInTheDocument();
    expect(screen.getByTestId('confirm-delete')).toBeInTheDocument();
    expect(screen.getByTestId('modal')).toBeInTheDocument();
  });

  it('calls useFetchProducts hook on render', () => {
    const mockUseFetchProducts = require('../../../../renderer/hooks/useFetchProducts');
    render(<Products />);

    expect(mockUseFetchProducts).toHaveBeenCalled();
  });
});
