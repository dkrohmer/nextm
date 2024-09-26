import { render, screen } from '@testing-library/react';
import Empty from '../../../../renderer/components/Products/Empty';
import '@testing-library/jest-dom';

describe('Empty Component', () => {
  it('renders the empty message header', () => {
    render(<Empty />);

    const headerElement = screen.getByTestId('empty-header');
    expect(headerElement).toBeInTheDocument();
    expect(headerElement).toHaveTextContent("It's quiet here 💤");
  });

  it('renders the empty message body with Add Product label', () => {
    render(<Empty />);

    const bodyElement = screen.getByTestId('empty-body');
    expect(bodyElement).toBeInTheDocument();
    expect(bodyElement).toHaveTextContent("Let's get productive by clicking");

    const addProductLabel = screen.getByTestId('add-product-label');
    expect(addProductLabel).toBeInTheDocument();
    expect(addProductLabel).toHaveTextContent('+ Add Product');
  });
});
