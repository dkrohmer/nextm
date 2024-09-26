import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { jest } from '@jest/globals';
import ZoneModalDescription from '../../../../renderer/components/ModelEditor/ZoneModalDescription';
import { setZoneDescription } from '../../../../renderer/store/modelEditor';

// Mock useDispatch and useSelector hooks
const mockDispatch = jest.fn();
const mockUseSelector = jest.fn();

jest.mock('react-redux', () => ({
  useDispatch: () => mockDispatch,
  useSelector: (selector: any) => mockUseSelector(selector),
}));

describe('ZoneModalDescription Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the text area with the current zone description', () => {
    // Set up the mock to return a description
    mockUseSelector.mockImplementation((selector: any) =>
      selector({
        modelEditor: {
          zoneDescription: 'Existing Zone Description',
        },
      }),
    );

    render(<ZoneModalDescription />);

    // Check if text area renders with the correct value
    const textAreaElement = screen.getByTestId('zone-description');
    expect(textAreaElement).toHaveValue('Existing Zone Description');
  });

  it('renders the text area with an empty value when zoneDescription is empty', () => {
    // Set up the mock to return an empty description
    mockUseSelector.mockImplementation((selector: any) =>
      selector({
        modelEditor: {
          zoneDescription: '',
        },
      }),
    );

    render(<ZoneModalDescription />);

    // Check if text area renders with an empty value
    const textAreaElement = screen.getByTestId('zone-description');
    expect(textAreaElement).toHaveValue('');
  });

  it('dispatches setZoneDescription action on input change', () => {
    // Set up the mock to return a description
    mockUseSelector.mockImplementation((selector: any) =>
      selector({
        modelEditor: {
          zoneDescription: 'Existing Zone Description',
        },
      }),
    );

    render(<ZoneModalDescription />);

    // Simulate text area change
    fireEvent.change(screen.getByTestId('zone-description'), {
      target: { value: 'New Zone Description' },
    });

    // Check if dispatch is called with correct action
    expect(mockDispatch).toHaveBeenCalledWith(
      setZoneDescription('New Zone Description'),
    );
  });

  it('should truncate the input value to 4999 characters if it exceeds 5000 characters', () => {
    mockUseSelector.mockImplementation((selector: any) =>
      selector({
        modelEditor: {
          zoneDescription: 'Existing Zone Description',
        },
      }),
    );

    render(<ZoneModalDescription />);

    const longDescription = 'A'.repeat(5100);
    fireEvent.change(screen.getByTestId('zone-description'), {
      target: { value: longDescription },
    });

    expect(mockDispatch).toHaveBeenCalledWith(
      setZoneDescription('A'.repeat(4999)),
    );
  });
});
