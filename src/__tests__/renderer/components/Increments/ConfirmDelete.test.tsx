import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ConfirmDelete from '../../../../renderer/components/Increments/ConfirmDelete';
import { deleteIncrement } from '../../../../renderer/services/api/increments';
import {
  setIncrementsActiveIndex,
  setIncrementsConfirmOpen,
} from '../../../../renderer/store/increments';

// Mocking useDispatch, useSelector, and useNavigate hooks
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

// Mock deleteIncrement API call
jest.mock('../../../../renderer/services/api/increments', () => ({
  deleteIncrement: jest.fn(),
}));

describe('ConfirmDelete Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the Confirm dialog when incrementsConfirmOpen is true', () => {
    // Mock useSelector to return incrementsConfirmOpen as true
    mockUseSelector.mockImplementation((selector: any) =>
      selector({
        increments: {
          incrementsConfirmOpen: true,
          incrementToDelete: { id: '1' },
        },
        products: { product: { id: 'testProductId' } },
      }),
    );

    // Render the ConfirmDelete component
    render(<ConfirmDelete />);

    // Check if the Confirm dialog is rendered
    expect(
      screen.getByText(/Deleting an increment will permanently delete/i),
    ).toBeInTheDocument();
  });

  it('does not render the Confirm dialog when incrementsConfirmOpen is false', () => {
    // Mock useSelector to return incrementsConfirmOpen as false
    mockUseSelector.mockImplementation((selector: any) =>
      selector({
        increments: { incrementsConfirmOpen: false, incrementToDelete: null },
        products: { product: { id: 'testProductId' } },
      }),
    );

    // Render the ConfirmDelete component
    render(<ConfirmDelete />);

    // Check if the Confirm dialog is not rendered
    expect(
      screen.queryByText(/Deleting an increment will permanently delete/i),
    ).not.toBeInTheDocument();
  });

  it('handles confirm action correctly', () => {
    // Mock useSelector to return the incrementToDelete and product
    mockUseSelector.mockImplementation((selector: any) =>
      selector({
        increments: {
          incrementsConfirmOpen: true,
          incrementToDelete: { id: '1' },
        },
        products: { product: { id: 'testProductId' } },
      }),
    );

    render(<ConfirmDelete />);

    // Simulate clicking the confirm button
    fireEvent.click(screen.getByText('OK'));

    // Ensure the deleteIncrement action is dispatched
    expect(mockDispatch).toHaveBeenCalledWith(deleteIncrement('1'));

    // Ensure navigation is called to the correct product page
    expect(mockNavigate).toHaveBeenCalledWith('/products/testProductId/');

    // Ensure the setIncrementsActiveIndex action is dispatched to reset the index
    expect(mockDispatch).toHaveBeenCalledWith(setIncrementsActiveIndex(-1));
  });

  it('handles cancel action correctly', () => {
    // Mock useSelector to return incrementsConfirmOpen as true
    mockUseSelector.mockImplementation((selector: any) =>
      selector({
        increments: {
          incrementsConfirmOpen: true,
          incrementToDelete: { id: '1' },
        },
        products: { product: { id: 'testProductId' } },
      }),
    );

    render(<ConfirmDelete />);

    // Simulate clicking the cancel button
    fireEvent.click(screen.getByText('Cancel'));

    // Ensure the setIncrementsConfirmOpen action is dispatched with false
    expect(mockDispatch).toHaveBeenCalledWith(setIncrementsConfirmOpen(false));
  });
});
