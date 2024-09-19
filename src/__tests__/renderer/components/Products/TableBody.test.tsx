import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import TableBody from '../../../../renderer/components/Products/TableBody';

// Mock child components
jest.mock('../../../../renderer/components/Products/TableRow', () => () => <tr data-testid="table-row"></tr>);
jest.mock('../../../../renderer/components/Products/Loader', () => ({ isLoading }: { isLoading: boolean }) => isLoading ? <div data-testid="loader"></div> : null);
jest.mock('../../../../renderer/components/Products/Error', () => ({ error }: { error: string }) => error ? <div data-testid="error-message">{error}</div> : null);
jest.mock('../../../../renderer/components/Products/Empty', () => () => <div data-testid="empty-message">No Products Available</div>);

// Mock useSelector
const mockUseSelector = jest.fn();
jest.mock('react-redux', () => ({
  useSelector: (selector: any) => mockUseSelector(selector),
}));

describe('TableBody Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the Loader when products are loading', () => {
    mockUseSelector.mockImplementation((selector: any) =>
      selector({
        products: {
          products: {products: [], productsCount: 0},
          productsError: null,
          productsIsLoading: true,
        },
      })
    );

    render(<TableBody />);

    expect(screen.getByTestId('loader')).toBeInTheDocument();
    expect(screen.queryByTestId('error-message')).not.toBeInTheDocument();
    expect(screen.queryByTestId('empty-message')).not.toBeInTheDocument();
    expect(screen.queryByTestId('table-row')).not.toBeInTheDocument();
  });

  it('renders the Error when there is an error', () => {
    mockUseSelector.mockImplementation((selector: any) =>
      selector({
        products: {
          products: {products: [], productsCount: 0},
          productsError: 'Error fetching products',
          productsIsLoading: false,
        },
      })
    );

    render(<TableBody />);

    expect(screen.getByTestId('error-message')).toHaveTextContent('Error fetching products');
    expect(screen.queryByTestId('loader')).not.toBeInTheDocument();
    expect(screen.queryByTestId('empty-message')).not.toBeInTheDocument();
    expect(screen.queryByTestId('table-row')).not.toBeInTheDocument();
  });

  it('renders the Empty component when there are no products and no error', () => {
    mockUseSelector.mockImplementation((selector: any) =>
      selector({
        products: {
          products: {products: [], productsCount: 0},
          productsError: null,
          productsIsLoading: false,
        },
      })
    );

    render(<TableBody />);

    expect(screen.getByTestId('empty-message')).toHaveTextContent('No Products Available');
    expect(screen.queryByTestId('loader')).not.toBeInTheDocument();
    expect(screen.queryByTestId('error-message')).not.toBeInTheDocument();
    expect(screen.queryByTestId('table-row')).not.toBeInTheDocument();
  });

  it('renders TableRow for each product when there are products', () => {
    mockUseSelector.mockImplementation((selector: any) =>
      selector({
        products: {
          products: {
            products: [
              { id: '1', name: 'Product 1', createdAt: '1' },
              { id: '2', name: 'Product 2', createdAt: '2' },
            ],
            productsCount: 2
          },
          productsError: null,
          productsIsLoading: false,
        },
      })
    );

    render(<TableBody />);

    const rows = screen.getAllByTestId('table-row');
    expect(rows).toHaveLength(2);
    expect(screen.queryByTestId('loader')).not.toBeInTheDocument();
    expect(screen.queryByTestId('error-message')).not.toBeInTheDocument();
    expect(screen.queryByTestId('empty-message')).not.toBeInTheDocument();
  });
});