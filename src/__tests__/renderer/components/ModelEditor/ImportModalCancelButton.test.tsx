import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ImportModalCancelButton from '../../../../renderer/components/ModelEditor/ImportModalCancelButton';
import { useDispatch } from 'react-redux';
import { setImportModalOpen, setImportFileName, setImportJsonData, setImportError, setImportIsFileValid } from '../../../../renderer/store/modelEditor';
import { jest } from '@jest/globals';

// Mock the useDispatch hook
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

    // Simulate the button click
    fireEvent.click(screen.getByText('Cancel'));

    // Verify that dispatch was called with the correct actions
    expect(mockDispatch).toHaveBeenCalledWith(setImportModalOpen(false));
    expect(mockDispatch).toHaveBeenCalledWith(setImportFileName(null));
    expect(mockDispatch).toHaveBeenCalledWith(setImportJsonData(null));
    expect(mockDispatch).toHaveBeenCalledWith(setImportError(null));
    expect(mockDispatch).toHaveBeenCalledWith(setImportIsFileValid(false));
  });
});
