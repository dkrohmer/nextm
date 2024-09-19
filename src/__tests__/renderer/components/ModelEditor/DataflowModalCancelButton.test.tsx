import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import DataflowModalCancelButton from '../../../../renderer/components/ModelEditor/DataflowModalCancelButton';
import { setDataflowModalOpen } from '../../../../renderer/store/modelEditor';
import { jest } from '@jest/globals';

// Mock the useDispatch hook
const mockDispatch = jest.fn();
jest.mock('react-redux', () => ({
  useDispatch: () => mockDispatch,
}));

describe('DataflowModalCancelButton Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('dispatches setDataflowModalOpen(false) action on click', () => {
    // Render the component
    render(<DataflowModalCancelButton />);

    // Simulate button click
    fireEvent.click(screen.getByText('Cancel'));

    // Check if dispatch is called with the correct action
    expect(mockDispatch).toHaveBeenCalledWith(setDataflowModalOpen(false));
  });
});
