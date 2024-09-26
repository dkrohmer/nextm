import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Error from '../../../../renderer/components/Products/Error';

describe('Error Component', () => {
  it('renders the error message with the provided text', () => {
    const errorMessage = 'Something went wrong!';

    render(<Error error={errorMessage} />);

    const errorHeader = screen.getByTestId('error-header');
    expect(errorHeader).toBeInTheDocument();
    expect(errorHeader).toHaveTextContent('Error❗️');

    const errorText = screen.getByTestId('error-text');
    expect(errorText).toBeInTheDocument();
    expect(errorText).toHaveTextContent(errorMessage);
  });

  it('displays the negative message style', () => {
    render(<Error error="Test error" />);

    const message = screen.getByTestId('error-message');
    expect(message).toHaveClass('negative');
  });
});
