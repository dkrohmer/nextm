import { render, screen, fireEvent } from '@testing-library/react';
import { deleteProduct } from '../../../../renderer/services/api/products';
import {
  setOpenConfirm,
  setProductToDelete,
  setProductsCurrentPage,
} from '../../../../renderer/store/products';
import ConfirmDelete from '../../../../renderer/components/Products/ConfirmDelete';
import '@testing-library/jest-dom';

const mockDispatch = jest.fn();
const mockUseSelector = jest.fn();
const mockNavigate = jest.fn();

jest.mock('react-redux', () => ({
  useDispatch: () => mockDispatch,
  useSelector: (selector: any) => mockUseSelector(selector),
}));

jest.mock('react-router-dom', () => ({
  useNavigate: () => mockNavigate,
}));

jest.mock('../../../../renderer/services/api/products', () => ({
  deleteProduct: jest.fn(),
}));

describe('ConfirmDelete Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the Confirm dialog when openConfirm is true', () => {
    mockUseSelector.mockImplementation((selector: any) =>
      selector({
        products: { openConfirm: true, productToDelete: '123', products: [] },
      }),
    );

    render(<ConfirmDelete />);

    expect(
      screen.getByText(/Deleting a product will permanently delete/i),
    ).toBeInTheDocument();
  });

  it('does not render the Confirm dialog when openConfirm is false', () => {
    mockUseSelector.mockImplementation((selector: any) =>
      selector({
        products: { openConfirm: false, productToDelete: null, products: [] },
      }),
    );

    render(<ConfirmDelete />);

    expect(
      screen.queryByText(/Deleting a product will permanently delete/i),
    ).not.toBeInTheDocument();
  });

  it('handles confirm action correctly', () => {
    mockUseSelector.mockImplementation((selector: any) =>
      selector({
        products: {
          openConfirm: true,
          productToDelete: '123',
          productsCurrentPage: 2,
          productsItemsPerPage: 10,
          productsSort: 'name',
          productsSortby: 'asc',
          products: { products: {}, productsCount: 0 },
        },
      }),
    );

    render(<ConfirmDelete />);

    fireEvent.click(screen.getByText('OK'));

    expect(mockDispatch).toHaveBeenCalledWith(
      deleteProduct({
        productId: '123',
        limit: 10,
        offset: 10,
        sort: 'name',
        sortby: 'asc',
      }),
    );

    expect(mockDispatch).toHaveBeenCalledWith(setProductToDelete(null));
    expect(mockDispatch).toHaveBeenCalledWith(setOpenConfirm(false));
  });

  it('handles cancel action correctly', () => {
    mockUseSelector.mockImplementation((selector: any) =>
      selector({
        products: { openConfirm: true, productToDelete: '123', products: [] },
      }),
    );

    render(<ConfirmDelete />);

    fireEvent.click(screen.getByText('Cancel'));

    expect(mockDispatch).toHaveBeenCalledWith(setOpenConfirm(false));
  });

  it('handles confirm action correctly when there is only one product on the page', () => {
    mockUseSelector.mockImplementation((selector: any) =>
      selector({
        products: {
          openConfirm: true,
          productToDelete: '123',
          productsCurrentPage: 2,
          productsItemsPerPage: 10,
          productsSort: 'name',
          productsSortby: 'asc',
          products: { products: [{ id: '123' }], productsCount: 1 },
        },
      }),
    );

    render(<ConfirmDelete />);

    fireEvent.click(screen.getByText('OK'));

    expect(mockDispatch).toHaveBeenCalledWith(
      deleteProduct({
        productId: '123',
        limit: 10,
        offset: 0,
        sort: 'name',
        sortby: 'asc',
      }),
    );

    expect(mockDispatch).toHaveBeenCalledWith(setProductsCurrentPage(1));
    expect(mockDispatch).toHaveBeenCalledWith(setProductToDelete(null));
    expect(mockDispatch).toHaveBeenCalledWith(setOpenConfirm(false));
  });
});
