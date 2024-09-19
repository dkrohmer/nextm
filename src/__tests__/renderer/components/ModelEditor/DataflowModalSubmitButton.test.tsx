import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import DataflowModalSubmitButton from '../../../../renderer/components/ModelEditor/DataflowModalSubmitButton'; // Adjust the import path if necessary

describe('DataflowModalSubmitButton Component', () => {
  it('renders the submit button with correct text and attributes', () => {
    render(<DataflowModalSubmitButton />);

    // Check if the button is in the document
    const buttonElement = screen.getByRole('button', { name: /submit/i });
    expect(buttonElement).toBeInTheDocument();

    // Check if the button has the correct text
    expect(buttonElement).toHaveTextContent('Submit');

    // Check if the button has the correct type attribute
    expect(buttonElement).toHaveAttribute('type', 'submit');

    // Check if the button has the primary class (assuming Semantic UI applies this class)
    expect(buttonElement).toHaveClass('primary');
  });
});
