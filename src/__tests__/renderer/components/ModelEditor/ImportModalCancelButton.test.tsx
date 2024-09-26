import { render, screen, fireEvent } from '@testing-library/react';
import { jest } from '@jest/globals';
import {
  setImportModalOpen,
  setImportFileName,
  setImportJsonData,
  setImportError,
  setImportIsFileValid,
} from '../../../../renderer/store/modelEditor';
import ImportModalCancelButton from '../../../../renderer/components/ModelEditor/ImportModalCancelButton';
import '@testing-library/jest-dom';


const mockDispatch = jest.fn();
jest.mock('react-redux', () => ({
  useDispatch: () => mockDispatch,
}));

describe('ImportModalCancelButton Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('dispatches the correct actions when the Cancel button is clicked', () => {
    render(<ImportModalCancelButton />);

    fireEvent.click(screen.getByText('Cancel'));

    expect(mockDispatch).toHaveBeenCalledWith(setImportModalOpen(false));
    expect(mockDispatch).toHaveBeenCalledWith(setImportFileName(null));
    expect(mockDispatch).toHaveBeenCalledWith(setImportJsonData(null));
    expect(mockDispatch).toHaveBeenCalledWith(setImportError(null));
    expect(mockDispatch).toHaveBeenCalledWith(setImportIsFileValid(false));
  });
});
