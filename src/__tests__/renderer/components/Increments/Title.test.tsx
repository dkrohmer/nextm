import { render, screen } from '@testing-library/react';
import Title from '../../../../renderer/components/Increments/Title';
import '@testing-library/jest-dom';

describe('Title Component', () => {
  it('renders the header with the correct text', () => {
    render(<Title />);

    expect(screen.getByText('Product Increments')).toBeInTheDocument();
  });

  it('applies the correct CSS classes', () => {
    render(<Title />);

    const container = screen.getByRole('heading', {
      name: /Product Increments/i,
    }).parentElement;
    expect(container).toHaveClass('increments-header-title');

    const header = screen.getByRole('heading', { name: /Product Increments/i });
    expect(header).toHaveClass('increments-header-text');
  });
});
