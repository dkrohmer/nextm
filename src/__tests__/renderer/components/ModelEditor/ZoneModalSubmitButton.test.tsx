import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ZoneModalSubmitButton from '../../../../renderer/components/ModelEditor/ZoneModalSubmitButton';

describe('ZoneModalSubmitButton Component', () => {
  it('renders the submit button with the correct text and attributes', () => {
    // Render the ZoneModalSubmitButton component
    render(<ZoneModalSubmitButton />);

    // Check if the button renders with the correct text
    const buttonElement = screen.getByRole('button', { name: /Submit/i });
    expect(buttonElement).toBeInTheDocument();

    // Check if the button has the primary class and submit type
    expect(buttonElement).toHaveAttribute('type', 'submit');
    expect(buttonElement).toHaveClass('primary');
  });
});
