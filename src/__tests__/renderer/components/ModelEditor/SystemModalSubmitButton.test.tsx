import { render, screen } from '@testing-library/react';
import SystemModalSubmitButton from '../../../../renderer/components/ModelEditor/SystemModalSubmitButton';
import '@testing-library/jest-dom';

describe('SystemModalSubmitButton Component', () => {
  it('renders the submit button with the correct text and attributes', () => {
    render(<SystemModalSubmitButton />);

    const buttonElement = screen.getByRole('button', { name: /Submit/i });
    expect(buttonElement).toBeInTheDocument();

    expect(buttonElement).toHaveAttribute('type', 'submit');
    expect(buttonElement).toHaveClass('primary');
  });
});
