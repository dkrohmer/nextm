import { render, screen, fireEvent } from '@testing-library/react';
import { jest } from '@jest/globals';
import { setActorModalOpen } from '../../../../renderer/store/modelEditor';
import ActorModalCancelButton from '../../../../renderer/components/ModelEditor/ActorModalCancelButton';
import '@testing-library/jest-dom';

const mockDispatch = jest.fn();
jest.mock('react-redux', () => ({
  useDispatch: () => mockDispatch,
}));

describe('ModalCancelButton Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('dispatches correct actions on click', () => {
    render(<ActorModalCancelButton />);

    fireEvent.click(screen.getByText('Cancel'));

    expect(mockDispatch).toHaveBeenCalledWith(setActorModalOpen(false));
  });
});
