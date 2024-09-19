import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Accordion from '../../../../renderer/components/Increments/Accordion';
import { useParams } from 'react-router-dom';
import { IProduct } from '../../../../renderer/interfaces/IProduct';
import { IIncrement } from '../../../../renderer/interfaces/IIncrement';
import { jest } from '@jest/globals';

// Mock useSelector and useParams hooks
const mockUseSelector = jest.fn();
jest.mock('react-redux', () => ({
  useSelector: (selector: any) => mockUseSelector(selector),
}));

// Mock useParams hook
jest.mock('react-router-dom', () => ({
  useParams: jest.fn(),
}));

// Mock useSetActiveIncrement hook
jest.mock('../../../../renderer/hooks/useSetActiveIncrement', () => jest.fn());

jest.mock('../../../../renderer/components/Increment', () => () => (
  <div data-testid="increment">Increment Component</div>
));

describe('Accordion Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the Accordion with increments when available', () => {
    const mockIncrements: IIncrement[] = [
      { id: '1', name: 'Increment 1', productId: '1' },
      { id: '2', name: 'Increment 2', productId: '1' },
    ];

    const mockProduct: IProduct = { id: '1', name: 'Product 1', createdAt: '2024-01-01T00:00:00Z' };

    // Mock useSelector to return increments and product
    mockUseSelector.mockImplementation((selector: any) => selector({
      increments: {
        increments: mockIncrements,
        incrementsIsLoading: false,
        incrementsError: null,
        incrementsIsLoaded: true,
      },
      products: {
        product: mockProduct,
      },
    }));

    // Mock useParams to return specific IDs
    (useParams as jest.Mock).mockReturnValue({
      productId: '1',
      incrementId: '1',
    });

    // Render the Accordion component
    render(<Accordion />);

    // Ensure the Accordion is rendered
    expect(screen.getByTestId('accordion')).toBeInTheDocument();

    // Ensure the Increment components are rendered
    expect(screen.getAllByTestId('increment')).toHaveLength(mockIncrements.length);
  });

  it('does not render the Accordion when increments are loading', () => {
    // Mock useSelector to return a loading state
    mockUseSelector.mockImplementation((selector: any) => selector({
      increments: {
        increments: [],
        incrementsIsLoading: true,
        incrementsError: null,
        incrementsIsLoaded: false,
      },
      products: {
        product: null,
      },
    }));

    render(<Accordion />);

    // Ensure the Accordion is not rendered
    expect(screen.queryByTestId('accordion')).not.toBeInTheDocument();
  });

  it('does not render the Accordion when there is an error', () => {
    // Mock useSelector to return an error state
    mockUseSelector.mockImplementation((selector: any) => selector({
      increments: {
        increments: [],
        incrementsIsLoading: false,
        incrementsError: 'Error occurred',
        incrementsIsLoaded: false,
      },
      products: {
        product: null,
      },
    }));

    render(<Accordion />);

    // Ensure the Accordion is not rendered
    expect(screen.queryByTestId('accordion')).not.toBeInTheDocument();
  });

  it('does not render the Accordion when there are no increments', () => {
    // Mock useSelector to return an empty increments state
    mockUseSelector.mockImplementation((selector: any) => selector({
      increments: {
        increments: [],
        incrementsIsLoading: false,
        incrementsError: null,
        incrementsIsLoaded: true,
      },
      products: {
        product: { id: '1', name: 'Product 1', createdAt: '2024-01-01T00:00:00Z' },
      },
    }));

    render(<Accordion />);

    // Ensure the Accordion is not rendered
    expect(screen.queryByTestId('accordion')).not.toBeInTheDocument();
  });
});
