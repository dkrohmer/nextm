import { render, screen } from '@testing-library/react';
import ZoneModalSubmitButton from '../../../../renderer/components/ModelEditor/ZoneModalSubmitButton';
import '@testing-library/jest-dom';

describe('ZoneModalSubmitButton Component', () => {
  it('renders the submit button with the correct text and attributes', () => {
    render(<ZoneModalSubmitButton />);

    const buttonElement = screen.getByRole('button', { name: /Submit/i });
    expect(buttonElement).toBeInTheDocument();

    expect(buttonElement).toHaveAttribute('type', 'submit');
    expect(buttonElement).toHaveClass('primary');
  });
});
