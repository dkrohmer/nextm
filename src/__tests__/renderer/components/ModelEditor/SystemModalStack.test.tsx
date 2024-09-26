import { render, screen, fireEvent } from '@testing-library/react';
import { jest } from '@jest/globals';
import { setSystemStack } from '../../../../renderer/store/modelEditor';
import SystemModalStack from '../../../../renderer/components/ModelEditor/SystemModalStack';
import '@testing-library/jest-dom';

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
    mockUseSelector.mockImplementation((selector: any) =>
      selector({
        modelEditor: {
          systemStack: 'Existing System Stack',
        },
      }),
    );

    render(<SystemModalStack />);

    const inputElement = screen.getByPlaceholderText('Add system stack...');

    expect(inputElement).toHaveValue('Existing System Stack');
  });

  it('renders the input with an empty value when systemStack is empty', () => {
    mockUseSelector.mockImplementation((selector: any) =>
      selector({
        modelEditor: {
          systemStack: '',
        },
      }),
    );

    render(<SystemModalStack />);

    const inputElement = screen.getByPlaceholderText('Add system stack...');
    expect(inputElement).toHaveValue('');
  });

  it('dispatches setSystemStack action on input change', () => {
    mockUseSelector.mockImplementation((selector: any) =>
      selector({
        modelEditor: {
          systemStack: 'Existing System Stack',
        },
      }),
    );

    render(<SystemModalStack />);

    fireEvent.change(screen.getByPlaceholderText('Add system stack...'), {
      target: { value: 'New System Stack' },
    });

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
