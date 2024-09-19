import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Empty from '../../../../renderer/components/Products/Empty'; // Adjust the import path if necessary

describe('Empty Component', () => {
  it('renders the empty message header', () => {
    render(<Empty />);

    // Check if the header text is rendered correctly
    const headerElement = screen.getByTestId('empty-header');
    expect(headerElement).toBeInTheDocument();
    expect(headerElement).toHaveTextContent("It's quiet here 💤");
  });

  it('renders the empty message body with Add Product label', () => {
    render(<Empty />);

    // Check if the body text is rendered correctly
    const bodyElement = screen.getByTestId('empty-body');
    expect(bodyElement).toBeInTheDocument();
    expect(bodyElement).toHaveTextContent("Let's get productive by clicking");

    // Check if the + Add Product label is rendered
    const addProductLabel = screen.getByTestId('add-product-label');
    expect(addProductLabel).toBeInTheDocument();
    expect(addProductLabel).toHaveTextContent('+ Add Product');
  });
});
