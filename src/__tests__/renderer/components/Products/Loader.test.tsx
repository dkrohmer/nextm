import { render, screen } from '@testing-library/react';
import Loader from '../../../../renderer/components/Products/Loader';
import '@testing-library/jest-dom';

describe('Loader Component', () => {
  it('renders the loader when isLoading is true', () => {
    render(<Loader isLoading />);

    const loaderElement = screen.getByTestId('models-loader');
    expect(loaderElement).toBeInTheDocument();
    expect(loaderElement).toHaveClass('active');

    expect(screen.getByText('Loading Products...')).toBeInTheDocument();
  });

  it('does not render the loader when isLoading is false', () => {
    render(<Loader isLoading={false} />);

    const loaderElement = screen.getByTestId('models-loader');
    expect(loaderElement).toBeInTheDocument();
    expect(loaderElement).not.toHaveClass('active');
  });
});
