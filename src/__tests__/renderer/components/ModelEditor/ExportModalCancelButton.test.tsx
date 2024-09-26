import { render, screen, fireEvent } from '@testing-library/react';
import { jest } from '@jest/globals';
import ExportModalCancel from '../../../../renderer/components/ModelEditor/ExportModalCancelButton';
import { setExportModalOpen } from '../../../../renderer/store/modelEditor';
import '@testing-library/jest-dom';

const mockDispatch = jest.fn();
jest.mock('react-redux', () => ({
  useDispatch: () => mockDispatch,
}));

describe('ExportModalCancel Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('dispatches correct actions on click', () => {
    render(<ExportModalCancel />);

    fireEvent.click(screen.getByRole('button', { name: /Cancel/i }));

    expect(mockDispatch).toHaveBeenCalledWith(setExportModalOpen(false));
  });
});
