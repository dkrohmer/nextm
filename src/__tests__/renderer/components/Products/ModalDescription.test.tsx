import { render, screen, fireEvent } from '@testing-library/react';
import { jest } from '@jest/globals';
import { setProductsCurrentProduct } from '../../../../renderer/store/products';
import ModalDescription from '../../../../renderer/components/Products/ModalDescription';
import '@testing-library/jest-dom';

const mockDispatch = jest.fn();
const mockUseSelector = jest.fn();

jest.mock('react-redux', () => ({
  useDispatch: () => mockDispatch,
  useSelector: (selector: any) => mockUseSelector(selector),
}));

describe('ModalDescription Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the text area with the current product description', () => {
    mockUseSelector.mockImplementation((selector: any) =>
      selector({
        products: {
          productsCurrentProduct: {
            id: '1',
            name: 'Test Product',
            description: 'Existing Product Description',
          },
        },
      }),
    );

    render(<ModalDescription />);

    const textAreaElement = screen.getByPlaceholderText('Description');
    expect(textAreaElement).toHaveValue('Existing Product Description');
  });

  it('renders the text area with an empty value when description is empty', () => {
    mockUseSelector.mockImplementation((selector: any) =>
      selector({
        products: {
          productsCurrentProduct: {
            id: '1',
            name: 'Test Product',
            description: '',
          },
        },
      }),
    );

    render(<ModalDescription />);

    const textAreaElement = screen.getByPlaceholderText('Description');
    expect(textAreaElement).toHaveValue('');
  });

  it('dispatches setProductsCurrentProduct action on input change', () => {
    mockUseSelector.mockImplementation((selector: any) =>
      selector({
        products: {
          productsCurrentProduct: {
            id: '1',
            name: 'Test Product',
            description: 'Existing Product Description',
            createdAt: '1',
          },
        },
      }),
    );

    render(<ModalDescription />);

    fireEvent.change(screen.getByPlaceholderText('Description'), {
      target: { value: 'New Product Description' },
    });

    expect(mockDispatch).toHaveBeenCalledWith(
      setProductsCurrentProduct({
        id: '1',
        name: 'Test Product',
        description: 'New Product Description',
        createdAt: '1',
      }),
    );
  });

  it('should truncate the description to 4999 characters if it exceeds 5000 characters', () => {
    mockUseSelector.mockImplementation((selector: any) =>
      selector({
        products: {
          productsCurrentProduct: {
            id: '1',
            name: 'Test Product',
            description: 'Existing Product Description',
            createdAt: '1',
          },
        },
      }),
    );

    render(<ModalDescription />);

    const longDescription = 'A'.repeat(5100);
    fireEvent.change(screen.getByPlaceholderText('Description'), {
      target: { value: longDescription },
    });

    expect(mockDispatch).toHaveBeenCalledWith(
      setProductsCurrentProduct({
        id: '1',
        name: 'Test Product',
        description: 'A'.repeat(4999),
        createdAt: '1',
      }),
    );
  });
});
