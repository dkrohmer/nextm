import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ModalName from '../../../../renderer/components/Increments/ModalName'; // Adjust the import path if necessary
import { setCurrentIncrement } from '../../../../renderer/store/increments';
import { useDispatch, useSelector } from 'react-redux';
import { jest } from '@jest/globals';

// Mock useDispatch and useSelector hooks
const mockDispatch = jest.fn();
const mockUseSelector = jest.fn();

jest.mock('react-redux', () => ({
  useDispatch: () => mockDispatch,
  useSelector: (selector: any) => mockUseSelector(selector),
}));

describe('ModalName Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the input with the current increment name', () => {
    // Set up the mock to return a non-null currentIncrement
    mockUseSelector.mockImplementation((selector: any) => selector({
      increments: {
        currentIncrement: { id: '1', name: 'Old Increment Name', productId: '123' },
      }
    }));

    render(<ModalName />);

    // Check if input field renders with the correct value
    const inputElement = screen.getByPlaceholderText('Increment Name');
    expect(inputElement).toHaveValue('Old Increment Name');
  });

  it('renders the input with an empty value when currentIncrement is null', () => {
    // Set up the mock to return a null currentIncrement
    mockUseSelector.mockImplementation((selector: any) => selector({
      increments: {
        currentIncrement: null,
      }
    }));

    render(<ModalName />);

    // Check if input field renders with an empty value
    const inputElement = screen.getByPlaceholderText('Increment Name');
    expect(inputElement).toHaveValue('');
  });

  it('dispatches setCurrentIncrement action on input change', () => {
    // Set up the mock to return a non-null currentIncrement
    mockUseSelector.mockImplementation((selector: any) => selector({
      increments: {
        currentIncrement: { id: '1', name: 'Old Increment Name', productId: '123' },
      }
    }));

    render(<ModalName />);

    // Simulate input change
    fireEvent.change(screen.getByPlaceholderText('Increment Name'), {
      target: { name: 'name', value: 'New Increment Name' }
    });

    // Check if dispatch is called with the correct action
    expect(mockDispatch).toHaveBeenCalledWith(
      setCurrentIncrement({ id: '1', name: 'New Increment Name', productId: '123' })
    );
  });
});