import { render, screen, fireEvent } from '@testing-library/react';
import { jest } from '@jest/globals';
import { setZoneName } from '../../../../renderer/store/modelEditor';
import ZoneModalName from '../../../../renderer/components/ModelEditor/ZoneModalName';
import '@testing-library/jest-dom';

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
    mockUseSelector.mockImplementation((selector: any) =>
      selector({
        modelEditor: {
          zoneName: 'Existing Zone Name',
        },
      }),
    );

    render(<ZoneModalName />);

    const inputElement = screen.getByPlaceholderText('Add zone name...');
    expect(inputElement).toHaveValue('Existing Zone Name');
  });

  it('renders the input with an empty value when zoneName is empty', () => {
    mockUseSelector.mockImplementation((selector: any) =>
      selector({
        modelEditor: {
          zoneName: '',
        },
      }),
    );

    render(<ZoneModalName />);

    const inputElement = screen.getByPlaceholderText('Add zone name...');
    expect(inputElement).toHaveValue('');
  });

  it('dispatches setZoneName action on input change', () => {
    mockUseSelector.mockImplementation((selector: any) =>
      selector({
        modelEditor: {
          zoneName: 'Existing Zone Name',
        },
      }),
    );

    render(<ZoneModalName />);

    fireEvent.change(screen.getByPlaceholderText('Add zone name...'), {
      target: { value: 'New Zone Name' },
    });

    expect(mockDispatch).toHaveBeenCalledWith(setZoneName('New Zone Name'));
  });

  it('should truncate the input value to 249 characters if it exceeds 250 characters', () => {
    mockUseSelector.mockImplementation((selector: any) =>
      selector({
        modelEditor: {
          zoneName: 'Existing Zone Name',
        },
      }),
    );

    render(<ZoneModalName />);

    const longName = 'A'.repeat(260);
    fireEvent.change(screen.getByPlaceholderText('Add zone name...'), {
      target: { value: longName },
    });

    expect(mockDispatch).toHaveBeenCalledWith(setZoneName('A'.repeat(249)));
  });
});
