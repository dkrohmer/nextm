import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import DataflowModalLabel from '../../../../renderer/components/ModelEditor/DataflowModalLabel'; // Adjust the import path if necessary
import { setDataflowLabel } from '../../../../renderer/store/modelEditor';
import { jest } from '@jest/globals';

// Mock useDispatch and useSelector hooks
const mockDispatch = jest.fn();
const mockUseSelector = jest.fn();

jest.mock('react-redux', () => ({
  useDispatch: () => mockDispatch,
  useSelector: (selector: any) => mockUseSelector(selector),
}));

describe('DataflowModalLabel Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the input with the current dataflow label', () => {
    // Set up the mock to return a non-empty dataflowLabel
    mockUseSelector.mockImplementation((selector: any) => selector({
      modelEditor: {
        dataflowLabel: 'Existing Label',
      }
    }));

    render(<DataflowModalLabel />);

    // Check if input field renders with the correct value using placeholder
    const inputElement = screen.getByPlaceholderText('Add label...');
    expect(inputElement).toHaveValue('Existing Label');
  });

  it('renders the input with an empty value when dataflowLabel is empty', () => {
    // Set up the mock to return an empty dataflowLabel
    mockUseSelector.mockImplementation((selector: any) => selector({
      modelEditor: {
        dataflowLabel: '',
      }
    }));

    render(<DataflowModalLabel />);

    // Check if input field renders with an empty value using placeholder
    const inputElement = screen.getByPlaceholderText('Add label...');
    expect(inputElement).toHaveValue('');
  });

  it('dispatches setDataflowLabel action on input change', () => {
    // Set up the mock to return a non-empty dataflowLabel
    mockUseSelector.mockImplementation((selector: any) => selector({
      modelEditor: {
        dataflowLabel: 'Existing Label',
      }
    }));

    render(<DataflowModalLabel />);

    // Simulate input change
    fireEvent.change(screen.getByPlaceholderText('Add label...'), {
      target: { value: 'New Label' },
    });

    // Check if dispatch is called with the correct action
    expect(mockDispatch).toHaveBeenCalledWith(setDataflowLabel('New Label'));
  });

  it('should truncate the input value to 249 characters if it exceeds 250 characters', () => {
    mockUseSelector.mockImplementation((selector: any) => selector({
      modelEditor: {
        dataflowLabel: 'Existing Label',
      }
    }));
  
    render(<DataflowModalLabel />);
  
    const longLabel = 'A'.repeat(260); // 260 characters
    fireEvent.change(screen.getByPlaceholderText('Add label...'), {
      target: { value: longLabel },
    });
  
    expect(mockDispatch).toHaveBeenCalledWith(setDataflowLabel('A'.repeat(249))); // Truncated to 249 characters
  });
});
