import { render, screen, fireEvent } from '@testing-library/react';
import { jest } from '@jest/globals';
import { setDataflowLabel } from '../../../../renderer/store/modelEditor';
import DataflowModalLabel from '../../../../renderer/components/ModelEditor/DataflowModalLabel';
import '@testing-library/jest-dom';

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
    mockUseSelector.mockImplementation((selector: any) =>
      selector({
        modelEditor: {
          dataflowLabel: 'Existing Label',
        },
      }),
    );

    render(<DataflowModalLabel />);

    const inputElement = screen.getByPlaceholderText('Add label...');
    expect(inputElement).toHaveValue('Existing Label');
  });

  it('renders the input with an empty value when dataflowLabel is empty', () => {
    mockUseSelector.mockImplementation((selector: any) =>
      selector({
        modelEditor: {
          dataflowLabel: '',
        },
      }),
    );

    render(<DataflowModalLabel />);

    const inputElement = screen.getByPlaceholderText('Add label...');
    expect(inputElement).toHaveValue('');
  });

  it('dispatches setDataflowLabel action on input change', () => {
    mockUseSelector.mockImplementation((selector: any) =>
      selector({
        modelEditor: {
          dataflowLabel: 'Existing Label',
        },
      }),
    );

    render(<DataflowModalLabel />);

    fireEvent.change(screen.getByPlaceholderText('Add label...'), {
      target: { value: 'New Label' },
    });

    expect(mockDispatch).toHaveBeenCalledWith(setDataflowLabel('New Label'));
  });

  it('should truncate the input value to 249 characters if it exceeds 250 characters', () => {
    mockUseSelector.mockImplementation((selector: any) =>
      selector({
        modelEditor: {
          dataflowLabel: 'Existing Label',
        },
      }),
    );

    render(<DataflowModalLabel />);

    const longLabel = 'A'.repeat(260);
    fireEvent.change(screen.getByPlaceholderText('Add label...'), {
      target: { value: longLabel },
    });

    expect(mockDispatch).toHaveBeenCalledWith(
      setDataflowLabel('A'.repeat(249)),
    );
  });
});
