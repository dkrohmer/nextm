import { render, screen } from '@testing-library/react';
import { useParams } from 'react-router-dom';
import { jest } from '@jest/globals';
import { IProduct } from '../../../../renderer/interfaces/IProduct';
import { IIncrement } from '../../../../renderer/interfaces/IIncrement';
import Accordion from '../../../../renderer/components/Increments/Accordion';
import '@testing-library/jest-dom';

const mockUseSelector = jest.fn();
jest.mock('react-redux', () => ({
  useSelector: (selector: any) => mockUseSelector(selector),
}));

jest.mock('react-router-dom', () => ({
  useParams: jest.fn(),
}));

jest.mock('../../../../renderer/hooks/useSetActiveIncrement', () => jest.fn());

jest.mock(
  '../../../../renderer/components/Increment',
  () =>
    function () {
      return <div data-testid="increment">Increment Component</div>;
    },
);

describe('Accordion Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the Accordion with increments when available', () => {
    const mockIncrements: IIncrement[] = [
      { id: '1', name: 'Increment 1', productId: '1' },
      { id: '2', name: 'Increment 2', productId: '1' },
    ];

    const mockProduct: IProduct = {
      id: '1',
      name: 'Product 1',
      createdAt: '2024-01-01T00:00:00Z',
    };

    mockUseSelector.mockImplementation((selector: any) =>
      selector({
        increments: {
          increments: mockIncrements,
          incrementsIsLoading: false,
          incrementsError: null,
          incrementsIsLoaded: true,
        },
        products: {
          product: mockProduct,
        },
      }),
    );

    (useParams as jest.Mock).mockReturnValue({
      productId: '1',
      incrementId: '1',
    });

    render(<Accordion />);

    expect(screen.getByTestId('accordion')).toBeInTheDocument();
    expect(screen.getAllByTestId('increment')).toHaveLength(
      mockIncrements.length,
    );
  });

  it('does not render the Accordion when increments are loading', () => {
    mockUseSelector.mockImplementation((selector: any) =>
      selector({
        increments: {
          increments: [],
          incrementsIsLoading: true,
          incrementsError: null,
          incrementsIsLoaded: false,
        },
        products: {
          product: null,
        },
      }),
    );

    render(<Accordion />);

    expect(screen.queryByTestId('accordion')).not.toBeInTheDocument();
  });

  it('does not render the Accordion when there is an error', () => {
    mockUseSelector.mockImplementation((selector: any) =>
      selector({
        increments: {
          increments: [],
          incrementsIsLoading: false,
          incrementsError: 'Error occurred',
          incrementsIsLoaded: false,
        },
        products: {
          product: null,
        },
      }),
    );

    render(<Accordion />);

    expect(screen.queryByTestId('accordion')).not.toBeInTheDocument();
  });

  it('does not render the Accordion when there are no increments', () => {
    mockUseSelector.mockImplementation((selector: any) =>
      selector({
        increments: {
          increments: [],
          incrementsIsLoading: false,
          incrementsError: null,
          incrementsIsLoaded: true,
        },
        products: {
          product: {
            id: '1',
            name: 'Product 1',
            createdAt: '2024-01-01T00:00:00Z',
          },
        },
      }),
    );

    render(<Accordion />);

    expect(screen.queryByTestId('accordion')).not.toBeInTheDocument();
  });
});
