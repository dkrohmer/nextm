import { render, screen } from '@testing-library/react';
import Loader from '../../../../renderer/components/ModelEditor/Loader';
import '@testing-library/jest-dom';

describe('Loader Component', () => {
  it('renders the Loader component when isLoading is true', () => {
    render(<Loader isLoading />);

    const dimmerElement = screen
      .getByText('Loading Model...')
      .closest('.ui.dimmer');
    expect(dimmerElement).toBeInTheDocument();
    expect(dimmerElement).toHaveClass('ui');
    expect(dimmerElement).toHaveClass('dimmer');
    expect(dimmerElement).toHaveClass('active');
    expect(dimmerElement).toHaveClass('inverted');

    expect(screen.getByText('Loading Model...')).toBeInTheDocument();
  });

  it('does not render the Dimmer when isLoading is false', () => {
    render(<Loader isLoading={false} />);

    expect(screen.queryByText('Loading Model...')).toBeNull();

    const dimmerElement = screen.queryByRole('presentation');
    expect(dimmerElement).toBeNull();
  });
});
