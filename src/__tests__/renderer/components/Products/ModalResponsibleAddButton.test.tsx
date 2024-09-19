import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ModalResponsibleAddButton from '../../../../renderer/components/Products/ModalResponsibleAddButton'; // Adjust the import path if necessary
import { setProductsCurrentProduct } from '../../../../renderer/store/products';
import { jest } from '@jest/globals';

// Mock useDispatch and useSelector hooks
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
    // Set up the mock to return a non-null productsCurrentProduct
    mockUseSelector.mockImplementation((selector: any) => selector({
      products: {
        productsCurrentProduct: { id: '1', name: 'Test Product', responsibles: [] },
      },
    }));

    render(<ModalResponsibleAddButton />);

    // Check if the add button is rendered
    const buttonElement = screen.getByText('+ Add Responsible');
    expect(buttonElement).toBeInTheDocument();
  });

  it('dispatches setProductsCurrentProduct action on click with new responsible', () => {
    // Set up the mock to return a non-null productsCurrentProduct with existing responsibles
    mockUseSelector.mockImplementation((selector: any) => selector({
      products: {
        productsCurrentProduct: {
          id: '1',
          name: 'Test Product',
          createdAt: '1',
          responsibles: [{ id: '1', firstName: 'John', lastName: 'Doe', role: 'Manager' }],
        },
      },
    }));

    render(<ModalResponsibleAddButton />);

    // Simulate button click
    fireEvent.click(screen.getByText('+ Add Responsible'));

    // Check if dispatch is called with the correct updated responsibles
    expect(mockDispatch).toHaveBeenCalledWith(
      setProductsCurrentProduct({
        id: '1',
        name: 'Test Product',
        createdAt: '1',
        responsibles: [
          { id: '1', firstName: 'John', lastName: 'Doe', role: 'Manager' },
          { id: '', firstName: '', lastName: '', role: '' }, // New responsible
        ],
      })
    );
  });

  it('dispatches setProductsCurrentProduct action with empty responsibles array when responsibles is undefined', () => {
    // Set up the mock to return a productsCurrentProduct with undefined responsibles
    mockUseSelector.mockImplementation((selector: any) => selector({
      products: {
        productsCurrentProduct: {
          id: '1',
          name: 'Test Product',
          createdAt: '1',
          responsibles: undefined,
        },
      },
    }));

    render(<ModalResponsibleAddButton />);

    // Simulate button click
    fireEvent.click(screen.getByText('+ Add Responsible'));

    // Check if dispatch is called with the correct updated responsibles using the empty array fallback
    expect(mockDispatch).toHaveBeenCalledWith(
      setProductsCurrentProduct({
        id: '1',
        name: 'Test Product',
        createdAt: '1',
        responsibles: [{ id: '', firstName: '', lastName: '', role: '' }],
      })
    );
  });

  it('does not dispatch action if productsCurrentProduct is null', () => {
    // Set up the mock to return null for productsCurrentProduct
    mockUseSelector.mockImplementation((selector: any) => selector({
      products: {
        productsCurrentProduct: null,
      },
    }));

    render(<ModalResponsibleAddButton />);

    // Simulate button click
    fireEvent.click(screen.getByText('+ Add Responsible'));

    // Check that dispatch is not called
    expect(mockDispatch).not.toHaveBeenCalled();
  });
});
