import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import DataflowModalProtocol from '../../../../renderer/components/ModelEditor/DataflowModalProtocol'; // Adjust the import path if necessary
import { setDataflowProtocol } from '../../../../renderer/store/modelEditor';
import { jest } from '@jest/globals';

// Mock useDispatch and useSelector hooks
const mockDispatch = jest.fn();
const mockUseSelector = jest.fn();

jest.mock('react-redux', () => ({
  useDispatch: () => mockDispatch,
  useSelector: (selector: any) => mockUseSelector(selector),
}));

describe('DataflowModalProtocol Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the input with the current dataflow protocol', () => {
    // Set up the mock to return a non-empty dataflowProtocol
    mockUseSelector.mockImplementation((selector: any) => selector({
      modelEditor: {
        dataflowProtocol: 'Existing Protocol',
      }
    }));

    render(<DataflowModalProtocol />);

    // Check if input field renders with the correct value using placeholder
    const inputElement = screen.getByPlaceholderText('Add protocol...');
    expect(inputElement).toHaveValue('Existing Protocol');
  });

  it('renders the input with an empty value when dataflowProtocol is empty', () => {
    // Set up the mock to return an empty dataflowProtocol
    mockUseSelector.mockImplementation((selector: any) => selector({
      modelEditor: {
        dataflowProtocol: '',
      }
    }));

    render(<DataflowModalProtocol />);

    // Check if input field renders with an empty value using placeholder
    const inputElement = screen.getByPlaceholderText('Add protocol...');
    expect(inputElement).toHaveValue('');
  });

  it('dispatches setDataflowProtocol action on input change', () => {
    // Set up the mock to return a non-empty dataflowProtocol
    mockUseSelector.mockImplementation((selector: any) => selector({
      modelEditor: {
        dataflowProtocol: 'Existing Protocol',
      }
    }));

    render(<DataflowModalProtocol />);

    // Simulate input change
    fireEvent.change(screen.getByPlaceholderText('Add protocol...'), {
      target: { value: 'New Protocol' },
    });

    // Check if dispatch is called with the correct action
    expect(mockDispatch).toHaveBeenCalledWith(setDataflowProtocol('New Protocol'));
  });

  it('should truncate the input value to 249 characters if it exceeds 250 characters', () => {
    mockUseSelector.mockImplementation((selector: any) => selector({
      modelEditor: {
        dataflowProtocol: 'Existing Protocol',
      }
    }));
  
    render(<DataflowModalProtocol />);
  
    const longProtocol = 'P'.repeat(260); // 260 characters
    fireEvent.change(screen.getByPlaceholderText('Add protocol...'), {
      target: { value: longProtocol },
    });
  
    expect(mockDispatch).toHaveBeenCalledWith(setDataflowProtocol('P'.repeat(249))); // Truncated to 249 characters
  });
});
