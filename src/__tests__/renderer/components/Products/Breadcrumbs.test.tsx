import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Breadcrumbs from '../../../../renderer/components/Products/Breadcrumbs'; // Adjust the import path if necessary

describe('Breadcrumbs Component', () => {
  it('renders the Breadcrumb with the correct text', () => {
    render(<Breadcrumbs />);

    // Check if the breadcrumb section with the data-testid 'breadcrumb-section' is rendered
    const breadcrumbSection = screen.getByTestId('breadcrumb-section');
    expect(breadcrumbSection).toBeInTheDocument();
    expect(breadcrumbSection).toHaveTextContent('Products');
    expect(breadcrumbSection).toHaveClass('active');
  });

  it('applies the correct class to the breadcrumb', () => {
    render(<Breadcrumbs />);

    // Check if the breadcrumb has the correct class using data-testid
    const breadcrumb = screen.getByTestId('breadcrumb');
    expect(breadcrumb).toHaveClass('products-breadcrumb');
  });
});
