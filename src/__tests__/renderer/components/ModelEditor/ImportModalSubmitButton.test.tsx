import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ImportModalSubmitButton from '../../../../renderer/components/ModelEditor/ImportModalSubmitButton'; // Adjust the import path if necessary
import { useSelector } from 'react-redux';
import { jest } from '@jest/globals';

// Mock useSelector hook
const mockUseSelector = jest.fn();

jest.mock('react-redux', () => ({
  useSelector: (selector: any) => mockUseSelector(selector),
}));

describe('ImportModalSubmitButton Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the submit button as enabled when importIsFileValid is true', () => {
    // Set up the mock to return importIsFileValid = true
    mockUseSelector.mockImplementation((selector: any) => selector({
      modelEditor: {
        importIsFileValid: true,
      }
    }));

    render(<ImportModalSubmitButton />);

    // Check if button is not disabled
    const submitButton = screen.getByRole('button', { name: /import/i });
    expect(submitButton).not.toBeDisabled();
  });

  it('renders the submit button as disabled when importIsFileValid is false', () => {
    // Set up the mock to return importIsFileValid = false
    mockUseSelector.mockImplementation((selector: any) => selector({
      modelEditor: {
        importIsFileValid: false,
      }
    }));

    render(<ImportModalSubmitButton />);

    // Check if button is disabled
    const submitButton = screen.getByRole('button', { name: /import/i });
    expect(submitButton).toBeDisabled();
  });

  it('renders the submit button with correct attributes', () => {
    // Set up the mock to return default values
    mockUseSelector.mockImplementation((selector: any) => selector({
      modelEditor: {
        importIsFileValid: true, // Or false, the attributes shouldn't change
      }
    }));

    render(<ImportModalSubmitButton />);

    // Check if the button has type "submit" and primary class
    const submitButton = screen.getByRole('button', { name: /import/i });
    expect(submitButton).toHaveAttribute('type', 'submit');
    expect(submitButton).toHaveClass('primary');
  });
});
