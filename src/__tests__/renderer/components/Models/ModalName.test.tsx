import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ModalName from '../../../../renderer/components/Models/ModalName'; // Adjust the import path if necessary
import { setModelsCurrentModel } from '../../../../renderer/store/models';
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

  it('renders the input with the current model name', () => {
    // Set up the mock to return a non-null modelsCurrentModel
    mockUseSelector.mockImplementation((selector: any) => selector({
      models: {
        modelsCurrentModel: { id: '1', name: 'Old Model Name', createdAt: '1', incrementId: '123' },
      }
    }));

    render(<ModalName />);

    // Check if input field renders with the correct value
    const inputElement = screen.getByPlaceholderText('Threat Model Name');
    expect(inputElement).toHaveValue('Old Model Name');
  });

  it('renders the input with an empty value when modelsCurrentModel is null', () => {
    // Set up the mock to return a null modelsCurrentModel
    mockUseSelector.mockImplementation((selector: any) => selector({
      models: {
        modelsCurrentModel: null,
      }
    }));

    render(<ModalName />);

    // Check if input field renders with an empty value
    const inputElement = screen.getByPlaceholderText('Threat Model Name');
    expect(inputElement).toHaveValue('');
  });

  it('dispatches setModelsCurrentModel action on input change', () => {
    // Set up the mock to return a non-null modelsCurrentModel
    mockUseSelector.mockImplementation((selector: any) => selector({
      models: {
        modelsCurrentModel: { id: '1', name: 'Old Model Name', createdAt: '1', incrementId: '123' },
      }
    }));

    render(<ModalName />);

    // Simulate input change
    fireEvent.change(screen.getByPlaceholderText('Threat Model Name'), {
      target: { value: 'New Model Name' }
    });

    // Check if dispatch is called with the correct action
    expect(mockDispatch).toHaveBeenCalledWith(
      setModelsCurrentModel({ id: '1', name: 'New Model Name', createdAt: '1', incrementId: '123' })
    );
  });
});
