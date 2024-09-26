import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ModelLoader from '../../../../renderer/components/Model/Loader'; // Adjust import path as needed

describe('ModelLoader Component', () => {
  it('renders the loader when isLoading is true', () => {
    render(<ModelLoader isLoading />);

    // Verify that the Dimmer is present with the correct classes
    const dimmerElement = screen.getByTestId('model-loader-dimmer');
    expect(dimmerElement).toHaveClass(
      'ui active transition visible inverted dimmer',
    );

    // Verify that the loader text is present inside the Dimmer
    const loaderElement = screen.getByText(/loading model/i);
    expect(loaderElement).toBeInTheDocument();
  });

  it('does not render the loader when isLoading is false', () => {
    render(<ModelLoader isLoading={false} />);
    // Verify that the Dimmer is present with the correct classes (inactive)
    const dimmerElement = screen.getByTestId('model-loader-dimmer');
    expect(dimmerElement).toHaveClass('ui inverted dimmer');
    // Ensure that the Dimmer does not have the 'active' class
    expect(dimmerElement).not.toHaveClass('active');
  });
});
