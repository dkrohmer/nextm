import { render, screen, fireEvent } from '@testing-library/react';
import { deleteIncrement } from '../../../../renderer/services/api/increments';
import {
  setIncrementsActiveIndex,
  setIncrementsConfirmOpen,
} from '../../../../renderer/store/increments';
import ConfirmDelete from '../../../../renderer/components/Increments/ConfirmDelete';
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

jest.mock('../../../../renderer/services/api/increments', () => ({
  deleteIncrement: jest.fn(),
}));

describe('ConfirmDelete Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the Confirm dialog when incrementsConfirmOpen is true', () => {
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

    expect(
      screen.getByText(/Deleting an increment will permanently delete/i),
    ).toBeInTheDocument();
  });

  it('does not render the Confirm dialog when incrementsConfirmOpen is false', () => {
    mockUseSelector.mockImplementation((selector: any) =>
      selector({
        increments: { incrementsConfirmOpen: false, incrementToDelete: null },
        products: { product: { id: 'testProductId' } },
      }),
    );

    render(<ConfirmDelete />);

    expect(
      screen.queryByText(/Deleting an increment will permanently delete/i),
    ).not.toBeInTheDocument();
  });

  it('handles confirm action correctly', () => {
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

    fireEvent.click(screen.getByText('OK'));

    expect(mockDispatch).toHaveBeenCalledWith(deleteIncrement('1'));
    expect(mockNavigate).toHaveBeenCalledWith('/products/testProductId/');
    expect(mockDispatch).toHaveBeenCalledWith(setIncrementsActiveIndex(-1));
  });

  it('handles cancel action correctly', () => {
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

    fireEvent.click(screen.getByText('Cancel'));

    expect(mockDispatch).toHaveBeenCalledWith(setIncrementsConfirmOpen(false));
  });
});
