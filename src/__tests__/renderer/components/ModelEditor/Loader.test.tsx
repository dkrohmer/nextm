import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Loader from '../../../../renderer/components/ModelEditor/Loader';

describe('Loader Component', () => {
  it('renders the Loader component when isLoading is true', () => {
    // Render the Loader component with isLoading set to true
    render(<Loader isLoading />);

    // Check that the Dimmer is active by looking for its class
    const dimmerElement = screen
      .getByText('Loading Model...')
      .closest('.ui.dimmer');
    expect(dimmerElement).toBeInTheDocument();
    expect(dimmerElement).toHaveClass('ui');
    expect(dimmerElement).toHaveClass('dimmer');
    expect(dimmerElement).toHaveClass('active');
    expect(dimmerElement).toHaveClass('inverted');

    // Check for the presence of the SemanticLoader text
    expect(screen.getByText('Loading Model...')).toBeInTheDocument();
  });

  it('does not render the Dimmer when isLoading is false', () => {
    // Render the Loader component with isLoading set to false
    render(<Loader isLoading={false} />);

    // Check that the Dimmer is not present
    expect(screen.queryByText('Loading Model...')).toBeNull();

    // Check that no Dimmer with class 'ui dimmer' exists
    const dimmerElement = screen.queryByRole('presentation');
    expect(dimmerElement).toBeNull();
  });
});
