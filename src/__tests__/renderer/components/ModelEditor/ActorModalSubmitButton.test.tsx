import { render, screen } from '@testing-library/react';
import ActorModalSubmitButton from '../../../../renderer/components/ModelEditor/ActorModalSubmitButton';
import '@testing-library/jest-dom';

describe('ActorModalSubmitButton Component', () => {
  it('renders the submit button with correct attributes and text', () => {
    render(<ActorModalSubmitButton />);

    const buttonElement = screen.getByText('Submit');
    expect(buttonElement).toBeInTheDocument();

    expect(buttonElement).toHaveAttribute('type', 'submit');

    expect(buttonElement).toHaveClass('primary');
  });
});
