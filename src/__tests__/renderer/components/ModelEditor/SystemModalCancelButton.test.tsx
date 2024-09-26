import { render, screen, fireEvent } from '@testing-library/react';
import { jest } from '@jest/globals';
import { setSystemModalOpen } from '../../../../renderer/store/modelEditor';
import SystemModalCancelButton from '../../../../renderer/components/ModelEditor/SystemModalCancelButton';
import '@testing-library/jest-dom';

const mockDispatch = jest.fn();
jest.mock('react-redux', () => ({
  useDispatch: () => mockDispatch,
}));

describe('SystemModalCancelButton Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the cancel button', () => {
    render(<SystemModalCancelButton />);

    expect(screen.getByRole('button', { name: /Cancel/i })).toBeInTheDocument();
  });

  it('dispatches setSystemModalOpen(false) when clicked', () => {
    render(<SystemModalCancelButton />);

    fireEvent.click(screen.getByRole('button', { name: /Cancel/i }));

    expect(mockDispatch).toHaveBeenCalledWith(setSystemModalOpen(false));
  });
});
