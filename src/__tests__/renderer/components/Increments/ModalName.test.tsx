import { render, screen, fireEvent } from '@testing-library/react';
import { jest } from '@jest/globals';
import { setCurrentIncrement } from '../../../../renderer/store/increments';
import ModalName from '../../../../renderer/components/Increments/ModalName';
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

  it('renders the input with the current increment name', () => {
    mockUseSelector.mockImplementation((selector: any) =>
      selector({
        increments: {
          currentIncrement: {
            id: '1',
            name: 'Old Increment Name',
            productId: '123',
          },
        },
      }),
    );

    render(<ModalName />);

    const inputElement = screen.getByPlaceholderText('Increment Name');
    expect(inputElement).toHaveValue('Old Increment Name');
  });

  it('renders the input with an empty value when currentIncrement is null', () => {
    mockUseSelector.mockImplementation((selector: any) =>
      selector({
        increments: {
          currentIncrement: null,
        },
      }),
    );

    render(<ModalName />);

    const inputElement = screen.getByPlaceholderText('Increment Name');
    expect(inputElement).toHaveValue('');
  });

  it('dispatches setCurrentIncrement action on input change', () => {
    mockUseSelector.mockImplementation((selector: any) =>
      selector({
        increments: {
          currentIncrement: {
            id: '1',
            name: 'Old Increment Name',
            productId: '123',
          },
        },
      }),
    );

    render(<ModalName />);

    fireEvent.change(screen.getByPlaceholderText('Increment Name'), {
      target: { name: 'name', value: 'New Increment Name' },
    });

    expect(mockDispatch).toHaveBeenCalledWith(
      setCurrentIncrement({
        id: '1',
        name: 'New Increment Name',
        productId: '123',
      }),
    );
  });

  it('should truncate the input value to 249 characters if it exceeds 250 characters', () => {
    mockUseSelector.mockImplementation((selector: any) =>
      selector({
        increments: {
          currentIncrement: {
            id: '1',
            name: 'Old Increment Name',
            productId: '123',
          },
        },
      }),
    );

    render(<ModalName />);

    const longName = 'A'.repeat(260);
    fireEvent.change(screen.getByPlaceholderText('Increment Name'), {
      target: { name: 'name', value: longName },
    });

    expect(mockDispatch).toHaveBeenCalledWith(
      setCurrentIncrement({ id: '1', name: 'A'.repeat(249), productId: '123' }),
    );
  });
});
