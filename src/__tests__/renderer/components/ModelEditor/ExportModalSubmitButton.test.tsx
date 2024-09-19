import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ExportModalSubmit from '../../../../renderer/components/ModelEditor/ExportModalSubmitButton'; // Adjust the path as needed

describe('ExportModalSubmit Component', () => {
  it('renders a submit button with the correct text', () => {
    render(<ExportModalSubmit />);

    // Select the button using its text
    const submitButton = screen.getByRole('button', { name: /Export/i });

    // Ensure the button is in the document
    expect(submitButton).toBeInTheDocument();

    // Verify that the button has the type "submit"
    expect(submitButton).toHaveAttribute('type', 'submit');
  });

  it('has the correct class for a primary button', () => {
    render(<ExportModalSubmit />);

    // Select the button
    const submitButton = screen.getByRole('button', { name: /Export/i });

    // Check that the button has the "primary" class
    expect(submitButton).toHaveClass('primary');
  });
});
