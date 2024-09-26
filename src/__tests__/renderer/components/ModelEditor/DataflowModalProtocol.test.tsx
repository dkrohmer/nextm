import { render, screen, fireEvent } from '@testing-library/react';
import { jest } from '@jest/globals';
import { setDataflowProtocol } from '../../../../renderer/store/modelEditor';
import DataflowModalProtocol from '../../../../renderer/components/ModelEditor/DataflowModalProtocol';
import '@testing-library/jest-dom';

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
    mockUseSelector.mockImplementation((selector: any) =>
      selector({
        modelEditor: {
          dataflowProtocol: 'Existing Protocol',
        },
      }),
    );

    render(<DataflowModalProtocol />);

    const inputElement = screen.getByPlaceholderText('Add protocol...');
    expect(inputElement).toHaveValue('Existing Protocol');
  });

  it('renders the input with an empty value when dataflowProtocol is empty', () => {
    mockUseSelector.mockImplementation((selector: any) =>
      selector({
        modelEditor: {
          dataflowProtocol: '',
        },
      }),
    );

    render(<DataflowModalProtocol />);

    const inputElement = screen.getByPlaceholderText('Add protocol...');
    expect(inputElement).toHaveValue('');
  });

  it('dispatches setDataflowProtocol action on input change', () => {
    mockUseSelector.mockImplementation((selector: any) =>
      selector({
        modelEditor: {
          dataflowProtocol: 'Existing Protocol',
        },
      }),
    );

    render(<DataflowModalProtocol />);

    fireEvent.change(screen.getByPlaceholderText('Add protocol...'), {
      target: { value: 'New Protocol' },
    });

    expect(mockDispatch).toHaveBeenCalledWith(
      setDataflowProtocol('New Protocol'),
    );
  });

  it('should truncate the input value to 249 characters if it exceeds 250 characters', () => {
    mockUseSelector.mockImplementation((selector: any) =>
      selector({
        modelEditor: {
          dataflowProtocol: 'Existing Protocol',
        },
      }),
    );

    render(<DataflowModalProtocol />);

    const longProtocol = 'P'.repeat(260);
    fireEvent.change(screen.getByPlaceholderText('Add protocol...'), {
      target: { value: longProtocol },
    });

    expect(mockDispatch).toHaveBeenCalledWith(
      setDataflowProtocol('P'.repeat(249)),
    );
  });
});
