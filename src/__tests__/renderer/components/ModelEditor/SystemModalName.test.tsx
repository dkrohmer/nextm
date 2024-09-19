import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import SystemModalName from '../../../../renderer/components/ModelEditor/SystemModalName'; // Adjust the import path if necessary
import { setSystemName } from '../../../../renderer/store/modelEditor';
import { jest } from '@jest/globals';

// Mock useDispatch and useSelector hooks
const mockDispatch = jest.fn();
const mockUseSelector = jest.fn();

jest.mock('react-redux', () => ({
  useDispatch: () => mockDispatch,
  useSelector: (selector: any) => mockUseSelector(selector),
}));

describe('SystemModalName Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the input with the current system name', () => {
    // Set up the mock to return a non-null systemName
    mockUseSelector.mockImplementation((selector: any) => selector({
      modelEditor: {
        systemName: 'Existing System Name',
      }
    }));

    render(<SystemModalName />);

    // Check if input field renders with the correct value using placeholder
    const inputElement = screen.getByPlaceholderText('Add system name...');
    expect(inputElement).toHaveValue('Existing System Name');
  });

  it('renders the input with an empty value when systemName is empty', () => {
    // Set up the mock to return an empty systemName
    mockUseSelector.mockImplementation((selector: any) => selector({
      modelEditor: {
        systemName: '',
      }
    }));

    render(<SystemModalName />);

    // Check if input field renders with an empty value using placeholder
    const inputElement = screen.getByPlaceholderText('Add system name...');
    expect(inputElement).toHaveValue('');
  });

  it('dispatches setSystemName action on input change', () => {
    // Set up the mock to return a non-null systemName
    mockUseSelector.mockImplementation((selector: any) => selector({
      modelEditor: {
        systemName: 'Existing System Name',
      }
    }));

    render(<SystemModalName />);

    // Simulate input change
    fireEvent.change(screen.getByPlaceholderText('Add system name...'), {
      target: { value: 'New System Name' },
    });

    // Check if dispatch is called with the correct action
    expect(mockDispatch).toHaveBeenCalledWith(setSystemName('New System Name'));
  });
});
