import { render, screen, fireEvent } from '@testing-library/react';
import { jest } from '@jest/globals';
import { setActorDescription } from '../../../../renderer/store/modelEditor';
import ActorModalDescription from '../../../../renderer/components/ModelEditor/ActorModalDescription';
import '@testing-library/jest-dom';

const mockDispatch = jest.fn();
const mockUseSelector = jest.fn();

jest.mock('react-redux', () => ({
  useDispatch: () => mockDispatch,
  useSelector: (selector: any) => mockUseSelector(selector),
}));

describe('ActorModalDescription Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the text area with the current actor description', () => {
    mockUseSelector.mockImplementation((selector: any) =>
      selector({
        modelEditor: {
          actorDescription: 'Existing Description',
        },
      }),
    );

    render(<ActorModalDescription />);

    const textAreaElement = screen.getByTestId('actor-description');
    expect(textAreaElement).toHaveValue('Existing Description');
  });

  it('renders the text area with an empty value when actorDescription is empty', () => {
    mockUseSelector.mockImplementation((selector: any) =>
      selector({
        modelEditor: {
          actorDescription: '',
        },
      }),
    );

    render(<ActorModalDescription />);

    const textAreaElement = screen.getByTestId('actor-description');
    expect(textAreaElement).toHaveValue('');
  });

  it('dispatches setActorDescription action on input change', () => {
    mockUseSelector.mockImplementation((selector: any) =>
      selector({
        modelEditor: {
          actorDescription: 'Existing Description',
        },
      }),
    );

    render(<ActorModalDescription />);

    fireEvent.change(screen.getByTestId('actor-description'), {
      target: { value: 'New Description' },
    });

    expect(mockDispatch).toHaveBeenCalledWith(
      setActorDescription('New Description'),
    );
  });

  it('should truncate the description to 4999 characters if it exceeds 5000 characters', () => {
    mockUseSelector.mockImplementation((selector: any) =>
      selector({
        modelEditor: {
          actorDescription: 'Existing Description',
        },
      }),
    );

    render(<ActorModalDescription />);

    const longDescription = 'A'.repeat(6000);
    fireEvent.change(screen.getByTestId('actor-description'), {
      target: { value: longDescription },
    });

    expect(mockDispatch).toHaveBeenCalledWith(
      setActorDescription('A'.repeat(4999)),
    );
  });
});
