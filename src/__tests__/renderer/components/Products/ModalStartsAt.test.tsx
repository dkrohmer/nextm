import { render, screen, fireEvent } from '@testing-library/react';
import { jest } from '@jest/globals';
import { setProductsCurrentProduct } from '../../../../renderer/store/products';
import ModalStartsAt from '../../../../renderer/components/Products/ModalStartsAt';
import '@testing-library/jest-dom';

const mockDispatch = jest.fn();
const mockUseSelector = jest.fn();

jest.mock('react-redux', () => ({
  useDispatch: () => mockDispatch,
  useSelector: (selector: any) => mockUseSelector(selector),
}));

jest.mock('../../../../renderer/utils/formatters', () => ({
  formatDate: jest.fn((date) => date || ''),
}));

describe('ModalStartsAt Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the input with the current product startsAt date', () => {
    mockUseSelector.mockImplementation((selector: any) =>
      selector({
        products: {
          productsCurrentProduct: {
            id: '1',
            name: 'Test Product',
            startsAt: '2023-01-01',
            endsAt: '2023-12-31',
          },
        },
      }),
    );

    render(<ModalStartsAt />);

    const inputElement = screen
      .getByTestId('product-starts-at-input')
      .querySelector('input');

    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveValue('2023-01-01');
  });

  it('renders the input with an empty value when productsCurrentProduct is null', () => {
    mockUseSelector.mockImplementation((selector: any) =>
      selector({
        products: {
          productsCurrentProduct: null,
        },
      }),
    );

    render(<ModalStartsAt />);

    const inputElement = screen
      .getByTestId('product-starts-at-input')
      .querySelector('input');

    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveValue('');
  });

  it('dispatches setProductsCurrentProduct action on input change', () => {
    mockUseSelector.mockImplementation((selector: any) =>
      selector({
        products: {
          productsCurrentProduct: {
            id: '1',
            name: 'Test Product',
            startsAt: '2023-01-01',
            endsAt: '2023-12-31',
            createdAt: '1',
          },
        },
      }),
    );

    render(<ModalStartsAt />);

    const inputElement = screen
      .getByTestId('product-starts-at-input')
      .querySelector('input');

    fireEvent.change(inputElement!, { target: { value: '2023-02-01' } });

    expect(mockDispatch).toHaveBeenCalledWith(
      setProductsCurrentProduct({
        id: '1',
        name: 'Test Product',
        startsAt: '2023-02-01',
        endsAt: '2023-12-31',
        createdAt: '1',
      }),
    );
  });

  it('sets the max attribute correctly based on the endsAt date', () => {
    mockUseSelector.mockImplementation((selector: any) =>
      selector({
        products: {
          productsCurrentProduct: {
            id: '1',
            name: 'Test Product',
            createdAt: '1',
            startsAt: '2023-01-01',
            endsAt: '2023-12-31',
          },
        },
      }),
    );

    render(<ModalStartsAt />);

    const inputElement = screen
      .getByTestId('product-starts-at-input')
      .querySelector('input');

    expect(inputElement).toHaveAttribute('max', '2023-12-31');
  });

  it('sets startsAt to null when the input is cleared', () => {
    mockUseSelector.mockImplementation((selector: any) =>
      selector({
        products: {
          productsCurrentProduct: {
            id: '1',
            name: 'Test Product',
            createdAt: '1',
            startsAt: '2023-01-01',
            endsAt: '2023-12-31',
          },
        },
      }),
    );

    render(<ModalStartsAt />);

    const inputElement = screen
      .getByTestId('product-starts-at-input')
      .querySelector('input');

    fireEvent.change(inputElement!, { target: { value: '' } });

    expect(mockDispatch).toHaveBeenCalledWith(
      setProductsCurrentProduct({
        id: '1',
        name: 'Test Product',
        createdAt: '1',
        startsAt: null,
        endsAt: '2023-12-31',
      }),
    );
  });
});
