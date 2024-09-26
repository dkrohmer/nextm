import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Title from '../../../../renderer/components/Increments/Title'; // Adjust the import path if necessary

describe('Title Component', () => {
  it('renders the header with the correct text', () => {
    render(<Title />);

    // Check if Header component has the text "Product Increments"
    expect(screen.getByText('Product Increments')).toBeInTheDocument();
  });

  it('applies the correct CSS classes', () => {
    render(<Title />);

    // Check if the header container has the correct class
    const container = screen.getByRole('heading', {
      name: /Product Increments/i,
    }).parentElement;
    expect(container).toHaveClass('increments-header-title');

    // Check if the header has the correct class
    const header = screen.getByRole('heading', { name: /Product Increments/i });
    expect(header).toHaveClass('increments-header-text');
  });
});
