import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import DataflowModalSubmitButton from '../../../../renderer/components/ModelEditor/DataflowModalSubmitButton';

describe('DataflowModalSubmitButton Component', () => {
  it('renders the submit button with correct text and attributes', () => {
    render(<DataflowModalSubmitButton />);

    const buttonElement = screen.getByRole('button', { name: /submit/i });

    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveTextContent('Submit');
    expect(buttonElement).toHaveAttribute('type', 'submit');
    expect(buttonElement).toHaveClass('primary');
  });
});
