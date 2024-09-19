import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import SystemModalSubmitButton from '../../../../renderer/components/ModelEditor/SystemModalSubmitButton';

describe('SystemModalSubmitButton Component', () => {
  it('renders the submit button with the correct text and attributes', () => {
    // Render the SystemModalSubmitButton component
    render(<SystemModalSubmitButton />);

    // Check if the button renders with the correct text
    const buttonElement = screen.getByRole('button', { name: /Submit/i });
    expect(buttonElement).toBeInTheDocument();

    // Check if the button has the primary class and submit type
    expect(buttonElement).toHaveAttribute('type', 'submit');
    expect(buttonElement).toHaveClass('primary');
  });
});
