import { render, screen } from '@testing-library/react';
import Breadcrumbs from '../../../../renderer/components/Products/Breadcrumbs';
import '@testing-library/jest-dom';

describe('Breadcrumbs Component', () => {
  it('renders the Breadcrumb with the correct text', () => {
    render(<Breadcrumbs />);

    const breadcrumbSection = screen.getByTestId('breadcrumb-section');
    expect(breadcrumbSection).toBeInTheDocument();
    expect(breadcrumbSection).toHaveTextContent('Products');
    expect(breadcrumbSection).toHaveClass('active');
  });

  it('applies the correct class to the breadcrumb', () => {
    render(<Breadcrumbs />);

    const breadcrumb = screen.getByTestId('breadcrumb');
    expect(breadcrumb).toHaveClass('products-breadcrumb');
  });
});
