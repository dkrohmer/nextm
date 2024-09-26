import { render, screen, fireEvent } from '@testing-library/react';
import { jest } from '@jest/globals';
import { setDataflowModalOpen } from '../../../../renderer/store/modelEditor';
import DataflowModalCancelButton from '../../../../renderer/components/ModelEditor/DataflowModalCancelButton';
import '@testing-library/jest-dom';


const mockDispatch = jest.fn();
jest.mock('react-redux', () => ({
  useDispatch: () => mockDispatch,
}));

describe('DataflowModalCancelButton Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('dispatches setDataflowModalOpen(false) action on click', () => {
    render(<DataflowModalCancelButton />);

    fireEvent.click(screen.getByText('Cancel'));

    expect(mockDispatch).toHaveBeenCalledWith(setDataflowModalOpen(false));
  });
});
