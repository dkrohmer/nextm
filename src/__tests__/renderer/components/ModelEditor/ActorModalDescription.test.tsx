import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ActorModalDescription from '../../../../renderer/components/ModelEditor/ActorModalDescription';
import { setActorDescription } from '../../../../renderer/store/modelEditor';
import { jest } from '@jest/globals';

// Mock useDispatch and useSelector hooks
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
    // Set up the mock to return a description
    mockUseSelector.mockImplementation((selector: any) => selector({
      modelEditor: {
        actorDescription: 'Existing Description',
      }
    }));

    render(<ActorModalDescription />);

    // Check if text area renders with the correct value
    const textAreaElement = screen.getByTestId('actor-description');
    expect(textAreaElement).toHaveValue('Existing Description');
  });

  it('renders the text area with an empty value when actorDescription is empty', () => {
    // Set up the mock to return an empty description
    mockUseSelector.mockImplementation((selector: any) => selector({
      modelEditor: {
        actorDescription: '',
      }
    }));

    render(<ActorModalDescription />);

    // Check if text area renders with an empty value
    const textAreaElement = screen.getByTestId('actor-description');
    expect(textAreaElement).toHaveValue('');
  });

  it('dispatches setActorDescription action on input change', () => {
    // Set up the mock to return a description
    mockUseSelector.mockImplementation((selector: any) => selector({
      modelEditor: {
        actorDescription: 'Existing Description',
      }
    }));

    render(<ActorModalDescription />);

    // Simulate text area change
    fireEvent.change(screen.getByTestId('actor-description'), {
      target: { value: 'New Description' },
    });

    // Check if dispatch is called with correct action
    expect(mockDispatch).toHaveBeenCalledWith(setActorDescription('New Description'));
  });
});
