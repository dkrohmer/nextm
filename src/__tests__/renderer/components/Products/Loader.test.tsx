import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Loader from '../../../../renderer/components/Products/Loader';

describe('Loader Component', () => {
  it('renders the loader when isLoading is true', () => {
    render(<Loader isLoading={true} />);

    // Check if the loader is present
    const loaderElement = screen.getByTestId('models-loader');
    expect(loaderElement).toBeInTheDocument();
    expect(loaderElement).toHaveClass('active'); // Check if the Dimmer is active

    // Check if the loader displays the correct loading message
    expect(screen.getByText('Loading Products...')).toBeInTheDocument();
  });

  it('does not render the loader when isLoading is false', () => {
    render(<Loader isLoading={false} />);

    // Check if the loader is rendered but inactive
    const loaderElement = screen.getByTestId('models-loader');
    expect(loaderElement).toBeInTheDocument();
    expect(loaderElement).not.toHaveClass('active'); // Check if the Dimmer is not active
  });
});
