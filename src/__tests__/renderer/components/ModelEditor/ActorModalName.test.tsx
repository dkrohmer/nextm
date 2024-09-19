import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ActorModalName from '../../../../renderer/components/ModelEditor/ActorModalName'; // Adjust the import path if necessary
import { setActorName } from '../../../../renderer/store/modelEditor';
import { jest } from '@jest/globals';

// Mock useDispatch and useSelector hooks
const mockDispatch = jest.fn();
const mockUseSelector = jest.fn();

jest.mock('react-redux', () => ({
  useDispatch: () => mockDispatch,
  useSelector: (selector: any) => mockUseSelector(selector),
}));

describe('ActorModalName Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the input with the current actor name', () => {
    // Set up the mock to return a non-null actorName
    mockUseSelector.mockImplementation((selector: any) => selector({
      modelEditor: {
        actorName: 'Existing Actor Name',
      }
    }));

    render(<ActorModalName />);

    // Check if input field renders with the correct value using placeholder
    const inputElement = screen.getByPlaceholderText('Add actor name...');
    expect(inputElement).toHaveValue('Existing Actor Name');
  });

  it('renders the input with an empty value when actorName is empty', () => {
    // Set up the mock to return an empty actorName
    mockUseSelector.mockImplementation((selector: any) => selector({
      modelEditor: {
        actorName: '',
      }
    }));

    render(<ActorModalName />);

    // Check if input field renders with an empty value using placeholder
    const inputElement = screen.getByPlaceholderText('Add actor name...');
    expect(inputElement).toHaveValue('');
  });

  it('dispatches setActorName action on input change', () => {
    // Set up the mock to return a non-null actorName
    mockUseSelector.mockImplementation((selector: any) => selector({
      modelEditor: {
        actorName: 'Existing Actor Name',
      }
    }));

    render(<ActorModalName />);

    // Simulate input change
    fireEvent.change(screen.getByPlaceholderText('Add actor name...'), {
      target: { value: 'New Actor Name' },
    });

    // Check if dispatch is called with the correct action
    expect(mockDispatch).toHaveBeenCalledWith(setActorName('New Actor Name'));
  });
});
