import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ActorModalSubmitButton from '../../../../renderer/components/ModelEditor/ActorModalSubmitButton';

describe('ActorModalSubmitButton Component', () => {
  it('renders the submit button with correct attributes and text', () => {
    render(<ActorModalSubmitButton />);

    // Check if button renders with the correct text
    const buttonElement = screen.getByText('Submit');
    expect(buttonElement).toBeInTheDocument();

    // Check if the button has the type 'submit'
    expect(buttonElement).toHaveAttribute('type', 'submit');

    // Check if the button has the class 'primary' (Semantic UI class for primary buttons)
    expect(buttonElement).toHaveClass('primary');
  });
});
