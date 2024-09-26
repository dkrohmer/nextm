import { render, screen, fireEvent } from '@testing-library/react';
import { jest } from '@jest/globals';
import { setProductsCurrentProduct } from '../../../../renderer/store/products';
import ModalResponsibleAddButton from '../../../../renderer/components/Products/ModalResponsibleAddButton';
import '@testing-library/jest-dom';

const mockDispatch = jest.fn();
const mockUseSelector = jest.fn();

jest.mock('react-redux', () => ({
  useDispatch: () => mockDispatch,
  useSelector: (selector: any) => mockUseSelector(selector),
}));

describe('ModalResponsibleAddButton Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the add responsible button', () => {
    mockUseSelector.mockImplementation((selector: any) =>
      selector({
        products: {
          productsCurrentProduct: {
            id: '1',
            name: 'Test Product',
            responsibles: [],
          },
        },
      }),
    );

    render(<ModalResponsibleAddButton />);

    const buttonElement = screen.getByText('+ Add Responsible');
    expect(buttonElement).toBeInTheDocument();
  });

  it('dispatches setProductsCurrentProduct action on click with new responsible', () => {
    mockUseSelector.mockImplementation((selector: any) =>
      selector({
        products: {
          productsCurrentProduct: {
            id: '1',
            name: 'Test Product',
            createdAt: '1',
            responsibles: [
              { id: '1', firstName: 'John', lastName: 'Doe', role: 'Manager' },
            ],
          },
        },
      }),
    );

    render(<ModalResponsibleAddButton />);

    fireEvent.click(screen.getByText('+ Add Responsible'));

    expect(mockDispatch).toHaveBeenCalledWith(
      setProductsCurrentProduct({
        id: '1',
        name: 'Test Product',
        createdAt: '1',
        responsibles: [
          { id: '1', firstName: 'John', lastName: 'Doe', role: 'Manager' },
          { id: '', firstName: '', lastName: '', role: '' },
        ],
      }),
    );
  });

  it('dispatches setProductsCurrentProduct action with empty responsibles array when responsibles is undefined', () => {
    mockUseSelector.mockImplementation((selector: any) =>
      selector({
        products: {
          productsCurrentProduct: {
            id: '1',
            name: 'Test Product',
            createdAt: '1',
            responsibles: undefined,
          },
        },
      }),
    );

    render(<ModalResponsibleAddButton />);

    fireEvent.click(screen.getByText('+ Add Responsible'));

    expect(mockDispatch).toHaveBeenCalledWith(
      setProductsCurrentProduct({
        id: '1',
        name: 'Test Product',
        createdAt: '1',
        responsibles: [{ id: '', firstName: '', lastName: '', role: '' }],
      }),
    );
  });

  it('does not dispatch action if productsCurrentProduct is null', () => {
    mockUseSelector.mockImplementation((selector: any) =>
      selector({
        products: {
          productsCurrentProduct: null,
        },
      }),
    );

    render(<ModalResponsibleAddButton />);

    fireEvent.click(screen.getByText('+ Add Responsible'));

    expect(mockDispatch).not.toHaveBeenCalled();
  });
});
