import { render, screen, fireEvent } from '@testing-library/react';
import { jest } from '@jest/globals';
import { setZoneModalOpen } from '../../../../renderer/store/modelEditor';
import ZoneModalCancelButton from '../../../../renderer/components/ModelEditor/ZoneModalCancelButton';
import '@testing-library/jest-dom';

const mockDispatch = jest.fn();
jest.mock('react-redux', () => ({
  useDispatch: () => mockDispatch,
}));

describe('ZoneModalCancelButton Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the cancel button', () => {
    render(<ZoneModalCancelButton />);

    expect(screen.getByRole('button', { name: /Cancel/i })).toBeInTheDocument();
  });

  it('dispatches setZoneModalOpen(false) when clicked', () => {
    render(<ZoneModalCancelButton />);

    fireEvent.click(screen.getByRole('button', { name: /Cancel/i }));

    expect(mockDispatch).toHaveBeenCalledWith(setZoneModalOpen(false));
  });
});
