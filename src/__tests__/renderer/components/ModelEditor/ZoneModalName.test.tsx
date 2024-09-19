import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ZoneModalName from '../../../../renderer/components/ModelEditor/ZoneModalName';
import { setZoneName } from '../../../../renderer/store/modelEditor';
import { jest } from '@jest/globals';

// Mock useDispatch and useSelector hooks
const mockDispatch = jest.fn();
const mockUseSelector = jest.fn();

jest.mock('react-redux', () => ({
  useDispatch: () => mockDispatch,
  useSelector: (selector: any) => mockUseSelector(selector),
}));

describe('ZoneModalName Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the input with the current zone name', () => {
    // Set up the mock to return a non-null zoneName
    mockUseSelector.mockImplementation((selector: any) => selector({
      modelEditor: {
        zoneName: 'Existing Zone Name',
      }
    }));

    render(<ZoneModalName />);

    // Check if input field renders with the correct value using placeholder
    const inputElement = screen.getByPlaceholderText('Add zone name...');
    expect(inputElement).toHaveValue('Existing Zone Name');
  });

  it('renders the input with an empty value when zoneName is empty', () => {
    // Set up the mock to return an empty zoneName
    mockUseSelector.mockImplementation((selector: any) => selector({
      modelEditor: {
        zoneName: '',
      }
    }));

    render(<ZoneModalName />);

    // Check if input field renders with an empty value using placeholder
    const inputElement = screen.getByPlaceholderText('Add zone name...');
    expect(inputElement).toHaveValue('');
  });

  it('dispatches setZoneName action on input change', () => {
    // Set up the mock to return a non-null zoneName
    mockUseSelector.mockImplementation((selector: any) => selector({
      modelEditor: {
        zoneName: 'Existing Zone Name',
      }
    }));

    render(<ZoneModalName />);

    // Simulate input change
    fireEvent.change(screen.getByPlaceholderText('Add zone name...'), {
      target: { value: 'New Zone Name' },
    });

    // Check if dispatch is called with the correct action
    expect(mockDispatch).toHaveBeenCalledWith(setZoneName('New Zone Name'));
  });
});
