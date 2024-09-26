import { render, screen } from '@testing-library/react';
import ModelLoader from '../../../../renderer/components/Model/Loader';
import '@testing-library/jest-dom';

describe('ModelLoader Component', () => {
  it('renders the loader when isLoading is true', () => {
    render(<ModelLoader isLoading />);

    const dimmerElement = screen.getByTestId('model-loader-dimmer');
    expect(dimmerElement).toHaveClass(
      'ui active transition visible inverted dimmer',
    );

    const loaderElement = screen.getByText(/loading model/i);
    expect(loaderElement).toBeInTheDocument();
  });

  it('does not render the loader when isLoading is false', () => {
    render(<ModelLoader isLoading={false} />);
    const dimmerElement = screen.getByTestId('model-loader-dimmer');
    expect(dimmerElement).toHaveClass('ui inverted dimmer');
    expect(dimmerElement).not.toHaveClass('active');
  });
});
