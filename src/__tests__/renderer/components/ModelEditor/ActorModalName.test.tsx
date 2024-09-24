import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ActorModalName from '../../../../renderer/components/ModelEditor/ActorModalName'; // Adjust the import path if necessary
import { setActorName } from '../../../../renderer/store/modelEditor';
import { jest } from '@jest/globals';

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
    mockUseSelector.mockImplementation((selector: any) => selector({
      modelEditor: {
        actorName: 'Existing Actor Name',
      }
    }));

    render(<ActorModalName />);

    const inputElement = screen.getByPlaceholderText('Add actor name...');
    expect(inputElement).toHaveValue('Existing Actor Name');
  });

  it('renders the input with an empty value when actorName is empty', () => {
    mockUseSelector.mockImplementation((selector: any) => selector({
      modelEditor: {
        actorName: '',
      }
    }));

    render(<ActorModalName />);

    const inputElement = screen.getByPlaceholderText('Add actor name...');
    expect(inputElement).toHaveValue('');
  });

  it('dispatches setActorName action on input change', () => {
    mockUseSelector.mockImplementation((selector: any) => selector({
      modelEditor: {
        actorName: 'Existing Actor Name',
      }
    }));

    render(<ActorModalName />);

    fireEvent.change(screen.getByPlaceholderText('Add actor name...'), {
      target: { value: 'New Actor Name' },
    });

    expect(mockDispatch).toHaveBeenCalledWith(setActorName('New Actor Name'));
  });

  it('should truncate the input value to 249 characters if it exceeds 250 characters', () => {
    mockUseSelector.mockImplementation((selector: any) => selector({
      modelEditor: {
        actorName: 'Existing Actor Name',
      }
    }));
  
    render(<ActorModalName />);
  
    const longName = 'A'.repeat(260);
    fireEvent.change(screen.getByPlaceholderText('Add actor name...'), {
      target: { value: longName },
    });
  
    expect(mockDispatch).toHaveBeenCalledWith(setActorName('A'.repeat(249))); // Truncated to 249 characters
  });
});
