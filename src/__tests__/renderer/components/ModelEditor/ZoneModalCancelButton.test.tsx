import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useDispatch } from 'react-redux';
import { jest } from '@jest/globals';
import ZoneModalCancelButton from '../../../../renderer/components/ModelEditor/ZoneModalCancelButton';
import { setZoneModalOpen } from '../../../../renderer/store/modelEditor';

// Mock the useDispatch hook
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
    
    // Check if the button is rendered with the correct label
    expect(screen.getByRole('button', { name: /Cancel/i })).toBeInTheDocument();
  });

  it('dispatches setZoneModalOpen(false) when clicked', () => {
    render(<ZoneModalCancelButton />);
    
    // Trigger the click event on the button
    fireEvent.click(screen.getByRole('button', { name: /Cancel/i }));
    
    // Verify that the correct action is dispatched
    expect(mockDispatch).toHaveBeenCalledWith(setZoneModalOpen(false));
  });
});
