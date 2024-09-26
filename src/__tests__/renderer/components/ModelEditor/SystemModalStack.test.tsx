import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { jest } from '@jest/globals';
import SystemModalStack from '../../../../renderer/components/ModelEditor/SystemModalStack'; // Adjust the import path if necessary
import { setSystemStack } from '../../../../renderer/store/modelEditor';

// Mock useDispatch and useSelector hooks
const mockDispatch = jest.fn();
const mockUseSelector = jest.fn();

jest.mock('react-redux', () => ({
  useDispatch: () => mockDispatch,
  useSelector: (selector: any) => mockUseSelector(selector),
}));

describe('SystemModalStack Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the input with the current system stack value', () => {
    // Set up the mock to return a non-null systemStack
    mockUseSelector.mockImplementation((selector: any) =>
      selector({
        modelEditor: {
          systemStack: 'Existing System Stack',
        },
      }),
    );

    render(<SystemModalStack />);

    // Check if input field renders with the correct value using placeholder
    const inputElement = screen.getByPlaceholderText('Add system stack...');
    expect(inputElement).toHaveValue('Existing System Stack');
  });

  it('renders the input with an empty value when systemStack is empty', () => {
    // Set up the mock to return an empty systemStack
    mockUseSelector.mockImplementation((selector: any) =>
      selector({
        modelEditor: {
          systemStack: '',
        },
      }),
    );

    render(<SystemModalStack />);

    // Check if input field renders with an empty value using placeholder
    const inputElement = screen.getByPlaceholderText('Add system stack...');
    expect(inputElement).toHaveValue('');
  });

  it('dispatches setSystemStack action on input change', () => {
    // Set up the mock to return a non-null systemStack
    mockUseSelector.mockImplementation((selector: any) =>
      selector({
        modelEditor: {
          systemStack: 'Existing System Stack',
        },
      }),
    );

    render(<SystemModalStack />);

    // Simulate input change
    fireEvent.change(screen.getByPlaceholderText('Add system stack...'), {
      target: { value: 'New System Stack' },
    });

    // Check if dispatch is called with the correct action
    expect(mockDispatch).toHaveBeenCalledWith(
      setSystemStack('New System Stack'),
    );
  });

  it('should truncate the input value to 249 characters if it exceeds 250 characters', () => {
    mockUseSelector.mockImplementation((selector: any) =>
      selector({
        modelEditor: {
          systemStack: 'Existing System Stack',
        },
      }),
    );

    render(<SystemModalStack />);

    const longStack = 'A'.repeat(260);
    fireEvent.change(screen.getByPlaceholderText('Add system stack...'), {
      target: { value: longStack },
    });

    expect(mockDispatch).toHaveBeenCalledWith(setSystemStack('A'.repeat(249)));
  });
});
