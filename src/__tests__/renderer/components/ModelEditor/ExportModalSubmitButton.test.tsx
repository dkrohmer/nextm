import { render, screen } from '@testing-library/react';
import ExportModalSubmit from '../../../../renderer/components/ModelEditor/ExportModalSubmitButton';
import '@testing-library/jest-dom';

describe('ExportModalSubmit Component', () => {
  it('renders a submit button with the correct text', () => {
    render(<ExportModalSubmit />);

    const submitButton = screen.getByRole('button', { name: /Export/i });

    expect(submitButton).toBeInTheDocument();
    expect(submitButton).toHaveAttribute('type', 'submit');
  });

  it('has the correct class for a primary button', () => {
    render(<ExportModalSubmit />);

    const submitButton = screen.getByRole('button', { name: /Export/i });

    expect(submitButton).toHaveClass('primary');
  });
});
