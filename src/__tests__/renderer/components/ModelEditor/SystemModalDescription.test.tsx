import { render, screen, fireEvent } from '@testing-library/react';
import { jest } from '@jest/globals';
import { setSystemDescription } from '../../../../renderer/store/modelEditor';
import SystemModalDescription from '../../../../renderer/components/ModelEditor/SystemModalDescription';
import '@testing-library/jest-dom';

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
    mockUseSelector.mockImplementation((selector: any) =>
      selector({
        modelEditor: {
          systemDescription: 'Existing System Description',
        },
      }),
    );

    render(<SystemModalDescription />);

    const textAreaElement = screen.getByTestId('system-description');
    expect(textAreaElement).toHaveValue('Existing System Description');
  });

  it('renders the text area with an empty value when systemDescription is empty', () => {
    mockUseSelector.mockImplementation((selector: any) =>
      selector({
        modelEditor: {
          systemDescription: '',
        },
      }),
    );

    render(<SystemModalDescription />);

    const textAreaElement = screen.getByTestId('system-description');
    expect(textAreaElement).toHaveValue('');
  });

  it('dispatches setSystemDescription action on input change', () => {
    mockUseSelector.mockImplementation((selector: any) =>
      selector({
        modelEditor: {
          systemDescription: 'Existing System Description',
        },
      }),
    );

    render(<SystemModalDescription />);

    fireEvent.change(screen.getByTestId('system-description'), {
      target: { value: 'New System Description' },
    });

    expect(mockDispatch).toHaveBeenCalledWith(
      setSystemDescription('New System Description'),
    );
  });

  it('should truncate the input value to 4999 characters if it exceeds 5000 characters', () => {
    mockUseSelector.mockImplementation((selector: any) =>
      selector({
        modelEditor: {
          systemDescription: 'Existing System Description',
        },
      }),
    );

    render(<SystemModalDescription />);

    const longDescription = 'A'.repeat(5100);
    fireEvent.change(screen.getByTestId('system-description'), {
      target: { value: longDescription },
    });

    expect(mockDispatch).toHaveBeenCalledWith(
      setSystemDescription('A'.repeat(4999)),
    );
  });
});
