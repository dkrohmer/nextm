import { render, screen, fireEvent } from '@testing-library/react';
import { jest } from '@jest/globals';
import { setProductsCurrentProduct } from '../../../../renderer/store/products';
import ModalName from '../../../../renderer/components/Products/ModalName';
import '@testing-library/jest-dom';

const mockDispatch = jest.fn();
const mockUseSelector = jest.fn();

jest.mock('react-redux', () => ({
  useDispatch: () => mockDispatch,
  useSelector: (selector: any) => mockUseSelector(selector),
}));

describe('ModalName Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the input with the current product name', () => {
    mockUseSelector.mockImplementation((selector: any) =>
      selector({
        products: {
          productsCurrentProduct: {
            id: '1',
            name: 'Old Product Name',
            createdAt: '1',
          },
        },
      }),
    );

    render(<ModalName />);

    const inputElement = screen.getByPlaceholderText('Product Name');
    expect(inputElement).toHaveValue('Old Product Name');
  });

  it('renders the input with an empty value when productsCurrentProduct is null', () => {
    mockUseSelector.mockImplementation((selector: any) =>
      selector({
        products: {
          productsCurrentProduct: null,
        },
      }),
    );

    render(<ModalName />);

    const inputElement = screen.getByPlaceholderText('Product Name');
    expect(inputElement).toHaveValue('');
  });

  it('dispatches setProductsCurrentProduct action on input change', () => {
    mockUseSelector.mockImplementation((selector: any) =>
      selector({
        products: {
          productsCurrentProduct: {
            id: '1',
            name: 'Old Product Name',
            createdAt: '1',
          },
        },
      }),
    );

    render(<ModalName />);

    fireEvent.change(screen.getByPlaceholderText('Product Name'), {
      target: { value: 'New Product Name' },
    });

    expect(mockDispatch).toHaveBeenCalledWith(
      setProductsCurrentProduct({
        id: '1',
        name: 'New Product Name',
        createdAt: '1',
      }),
    );
  });

  it('truncates the input value to 249 characters if it exceeds 250', () => {
    mockUseSelector.mockImplementation((selector: any) =>
      selector({
        products: {
          productsCurrentProduct: {
            id: '1',
            name: 'Old Product Name',
            createdAt: '1',
          },
        },
      }),
    );

    render(<ModalName />);

    const longInputValue = 'A'.repeat(260);
    fireEvent.change(screen.getByPlaceholderText('Product Name'), {
      target: { value: longInputValue },
    });

    expect(mockDispatch).toHaveBeenCalledWith(
      setProductsCurrentProduct({
        id: '1',
        name: 'A'.repeat(249),
        createdAt: '1',
      }),
    );
  });
});
