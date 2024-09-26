import { render, screen } from '@testing-library/react';
import ZoneModalTrustLevel from '../../../../renderer/components/ModelEditor/ZoneModalTrustLevel';
import '@testing-library/jest-dom';

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
    render(<ZoneModalTrustLevel />);

    expect(screen.getByText('Trust level')).toBeInTheDocument();
    expect(screen.getByTestId('trust-level-empty')).toBeInTheDocument();
    expect(screen.getByTestId('trust-level-untrusted')).toBeInTheDocument();
    expect(screen.getByTestId('trust-level-trusted')).toBeInTheDocument();
  });
});
