import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import SystemModalDescription from '../../../../renderer/components/ModelEditor/SystemModalDescription';
import { setSystemDescription } from '../../../../renderer/store/modelEditor';
import { jest } from '@jest/globals';

// Mock useDispatch and useSelector hooks
const mockDispatch = jest.fn();
const mockUseSelector = jest.fn();

jest.mock('react-redux', () => ({
  useDispatch: () => mockDispatch,
  useSelector: (selector: any) => mockUseSelector(selector),
}));

describe('SystemModalDescription Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the text area with the current system description', () => {
    // Set up the mock to return a description
    mockUseSelector.mockImplementation((selector: any) => selector({
      modelEditor: {
        systemDescription: 'Existing System Description',
      }
    }));

    render(<SystemModalDescription />);

    // Check if text area renders with the correct value
    const textAreaElement = screen.getByTestId('system-description');
    expect(textAreaElement).toHaveValue('Existing System Description');
  });

  it('renders the text area with an empty value when systemDescription is empty', () => {
    // Set up the mock to return an empty description
    mockUseSelector.mockImplementation((selector: any) => selector({
      modelEditor: {
        systemDescription: '',
      }
    }));

    render(<SystemModalDescription />);

    // Check if text area renders with an empty value
    const textAreaElement = screen.getByTestId('system-description');
    expect(textAreaElement).toHaveValue('');
  });

  it('dispatches setSystemDescription action on input change', () => {
    // Set up the mock to return a description
    mockUseSelector.mockImplementation((selector: any) => selector({
      modelEditor: {
        systemDescription: 'Existing System Description',
      }
    }));

    render(<SystemModalDescription />);

    // Simulate text area change
    fireEvent.change(screen.getByTestId('system-description'), {
      target: { value: 'New System Description' },
    });

    // Check if dispatch is called with correct action
    expect(mockDispatch).toHaveBeenCalledWith(setSystemDescription('New System Description'));
  });
});
