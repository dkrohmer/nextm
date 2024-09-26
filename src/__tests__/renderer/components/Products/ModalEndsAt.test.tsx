import { render, screen, fireEvent } from '@testing-library/react';
import { jest } from '@jest/globals';
import { setProductsCurrentProduct } from '../../../../renderer/store/products';
import ModalEndsAt from '../../../../renderer/components/Products/ModalEndsAt';
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

describe('ModalEndsAt Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the input with the current product endsAt date', () => {
    mockUseSelector.mockImplementation((selector: any) =>
      selector({
        products: {
          productsCurrentProduct: {
            id: '1',
            name: 'Test Product',
            endsAt: '2023-12-01',
            startsAt: '2023-01-01',
          },
        },
      }),
    );

    render(<ModalEndsAt />);

    const inputElement = screen
      .getByTestId('product-ends-at-input')
      .querySelector('input');

    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveValue('2023-12-01');
  });

  it('renders the input with an empty value when productsCurrentProduct is null', () => {
    mockUseSelector.mockImplementation((selector: any) =>
      selector({
        products: {
          productsCurrentProduct: null,
        },
      }),
    );

    render(<ModalEndsAt />);

    const inputElement = screen
      .getByTestId('product-ends-at-input')
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
            endsAt: '2023-12-01',
            startsAt: '2023-01-01',
            createdAt: '1',
          },
        },
      }),
    );

    render(<ModalEndsAt />);

    const inputElement = screen
      .getByTestId('product-ends-at-input')
      .querySelector('input');

    fireEvent.change(inputElement!, { target: { value: '2024-01-01' } });

    expect(mockDispatch).toHaveBeenCalledWith(
      setProductsCurrentProduct({
        id: '1',
        name: 'Test Product',
        endsAt: '2024-01-01',
        startsAt: '2023-01-01',
        createdAt: '1',
      }),
    );
  });

  it('sets value to null when input is cleared', () => {
    mockUseSelector.mockImplementation((selector: any) =>
      selector({
        products: {
          productsCurrentProduct: {
            id: '1',
            name: 'Test Product',
            endsAt: '2023-12-01',
            startsAt: '2023-01-01',
            createdAt: '1',
          },
        },
      }),
    );

    render(<ModalEndsAt />);

    const inputElement = screen
      .getByTestId('product-ends-at-input')
      .querySelector('input');

      fireEvent.change(inputElement!, { target: { value: '' } });

    expect(mockDispatch).toHaveBeenCalledWith(
      setProductsCurrentProduct({
        id: '1',
        name: 'Test Product',
        endsAt: null,
        startsAt: '2023-01-01',
        createdAt: '1',
      }),
    );
  });
});
