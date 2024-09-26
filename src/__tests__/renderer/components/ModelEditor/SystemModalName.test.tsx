import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { jest } from '@jest/globals';
import SystemModalName from '../../../../renderer/components/ModelEditor/SystemModalName'; // Adjust the import path if necessary
import { setSystemName } from '../../../../renderer/store/modelEditor';

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
    mockUseSelector.mockImplementation((selector: any) =>
      selector({
        modelEditor: {
          systemName: 'Existing System Name',
        },
      }),
    );

    render(<SystemModalName />);

    const inputElement = screen.getByPlaceholderText('Add system name...');
    expect(inputElement).toHaveValue('Existing System Name');
  });

  it('renders the input with an empty value when systemName is empty', () => {
    mockUseSelector.mockImplementation((selector: any) =>
      selector({
        modelEditor: {
          systemName: '',
        },
      }),
    );

    render(<SystemModalName />);

    const inputElement = screen.getByPlaceholderText('Add system name...');
    expect(inputElement).toHaveValue('');
  });

  it('dispatches setSystemName action on input change', () => {
    mockUseSelector.mockImplementation((selector: any) =>
      selector({
        modelEditor: {
          systemName: 'Existing System Name',
        },
      }),
    );

    render(<SystemModalName />);

    fireEvent.change(screen.getByPlaceholderText('Add system name...'), {
      target: { value: 'New System Name' },
    });

    expect(mockDispatch).toHaveBeenCalledWith(setSystemName('New System Name'));
  });

  it('should truncate the input value to 249 characters if it exceeds 250 characters', () => {
    mockUseSelector.mockImplementation((selector: any) =>
      selector({
        modelEditor: {
          systemName: 'Existing System Name',
        },
      }),
    );

    render(<SystemModalName />);

    const longName = 'A'.repeat(260);
    fireEvent.change(screen.getByPlaceholderText('Add system name...'), {
      target: { value: longName },
    });

    expect(mockDispatch).toHaveBeenCalledWith(setSystemName('A'.repeat(249)));
  });
});
