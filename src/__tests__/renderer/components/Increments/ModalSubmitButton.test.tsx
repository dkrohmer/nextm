import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ModalSubmitButton from '../../../../renderer/components/Increments/ModalSubmitButton'; // Adjust the import path if necessary
import { useSelector } from 'react-redux';
import { jest } from '@jest/globals';

// Mock useSelector hook
const mockUseSelector = jest.fn();

jest.mock('react-redux', () => ({
  useSelector: (selector: any) => mockUseSelector(selector),
}));

describe('ModalSubmitButton Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the button with text "Add" when not cloning or editing', () => {
    // Set up the mock to return default values
    mockUseSelector.mockImplementation((selector: any) => selector({
      increments: {
        incrementsIsEditing: false,
        incrementsIsCloning: false,
      }
    }));

    render(<ModalSubmitButton />);

    // Check if button text is "Add"
    expect(screen.getByRole('button', { name: /Add/i })).toBeInTheDocument();
  });

  it('renders the button with text "Edit" when editing', () => {
    // Set up the mock to return incrementsIsEditing = true
    mockUseSelector.mockImplementation((selector: any) => selector({
      increments: {
        incrementsIsEditing: true,
        incrementsIsCloning: false,
      }
    }));

    render(<ModalSubmitButton />);

    // Check if button text is "Edit"
    expect(screen.getByRole('button', { name: /Edit/i })).toBeInTheDocument();
  });

  it('renders the button with text "Clone" when cloning', () => {
    // Set up the mock to return incrementsIsCloning = true
    mockUseSelector.mockImplementation((selector: any) => selector({
      increments: {
        incrementsIsEditing: false,
        incrementsIsCloning: true,
      }
    }));

    render(<ModalSubmitButton />);

    // Check if button text is "Clone"
    expect(screen.getByRole('button', { name: /Clone/i })).toBeInTheDocument();
  });

  it('renders the button with correct attributes', () => {
    // Set up the mock to return default values
    mockUseSelector.mockImplementation((selector: any) => selector({
      increments: {
        incrementsIsEditing: false,
        incrementsIsCloning: false,
      }
    }));

    render(<ModalSubmitButton />);

    // Check if the button has type "submit" and primary class
    const button = screen.getByRole('button', { name: /Add/i });
    expect(button).toHaveAttribute('type', 'submit');
    expect(button).toHaveClass('primary');
  });
});
