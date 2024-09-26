import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ZoneModalTrustLevel from '../../../../renderer/components/ModelEditor/ZoneModalTrustLevel';

// Mock the sub-components
jest.mock(
  '../../../../renderer/components/ModelEditor/ZoneModalTrustLevelEmpty',
  () =>
    function () {
      return <div data-testid="trust-level-empty" />;
    },
);
jest.mock(
  '../../../../renderer/components/ModelEditor/ZoneModalTrustLevelUntrusted',
  () =>
    function () {
      return <div data-testid="trust-level-untrusted" />;
    },
);
jest.mock(
  '../../../../renderer/components/ModelEditor/ZoneModalTrustLevelTrusted',
  () =>
    function () {
      return <div data-testid="trust-level-trusted" />;
    },
);

describe('ZoneModalTrustLevel Component', () => {
  it('renders the Trust Level label and all trust level options', () => {
    // Render the ZoneModalTrustLevel component
    render(<ZoneModalTrustLevel />);

    // Check if the label is rendered correctly
    expect(screen.getByText('Trust level')).toBeInTheDocument();

    // Check if all trust level components are rendered
    expect(screen.getByTestId('trust-level-empty')).toBeInTheDocument();
    expect(screen.getByTestId('trust-level-untrusted')).toBeInTheDocument();
    expect(screen.getByTestId('trust-level-trusted')).toBeInTheDocument();
  });
});
