import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Error from '../../../../renderer/components/Products/Error'; // Adjust the import path if necessary

describe('Error Component', () => {
  it('renders the error message with the provided text', () => {
    const errorMessage = 'Something went wrong!';

    render(<Error error={errorMessage} />);

    // Check if the error message header is rendered
    const errorHeader = screen.getByTestId('error-header');
    expect(errorHeader).toBeInTheDocument();
    expect(errorHeader).toHaveTextContent('Error❗️');

    // Check if the error text is rendered correctly
    const errorText = screen.getByTestId('error-text');
    expect(errorText).toBeInTheDocument();
    expect(errorText).toHaveTextContent(errorMessage);
  });

  it('displays the negative message style', () => {
    render(<Error error="Test error" />);

    // Check if the Message component has the negative style
    const message = screen.getByTestId('error-message');
    expect(message).toHaveClass('negative');
  });
});
