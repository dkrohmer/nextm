import { render, screen } from '@testing-library/react';
import Footer from '../../../../renderer/components/Layout/Footer';

jest.mock(
  '../../../../renderer/components/layout/FooterContribute',
  () =>
    function () {
      return <div>FooterContribute Component</div>;
    },
);
jest.mock(
  '../../../../renderer/components/layout/FooterDiscuss',
  () =>
    function () {
      return <div>FooterDiscuss Component</div>;
    },
);
jest.mock(
  '../../../../renderer/components/layout/FooterDonate',
  () =>
    function () {
      return <div>FooterDonate Component</div>;
    },
);
jest.mock(
  '../../../../renderer/components/layout/FooterToolInfo',
  () =>
    function () {
      return <div>FooterToolInfo Component</div>;
    },
);
jest.mock(
  '../../../../renderer/components/layout/FooterCopyright',
  () =>
    function () {
      return <div>FooterCopyright Component</div>;
    },
);
jest.mock(
  '../../../../renderer/components/layout/FooterLicensing',
  () =>
    function () {
      return <div>FooterLicensing Component</div>;
    },
);

describe('Footer Component', () => {
  it('renders the Footer component with all sections', () => {
    render(<Footer />);

    expect(screen.getByText(/FooterContribute Component/i)).toBeInTheDocument();
    expect(screen.getByText(/FooterDiscuss Component/i)).toBeInTheDocument();
    expect(screen.getByText(/FooterDonate Component/i)).toBeInTheDocument();

    expect(screen.getByText(/FooterToolInfo Component/i)).toBeInTheDocument();
    expect(screen.getByText(/FooterCopyright Component/i)).toBeInTheDocument();
    expect(screen.getByText(/FooterLicensing Component/i)).toBeInTheDocument();
  });

  it('does not render any unexpected components', () => {
    render(<Footer />);

    expect(screen.queryByText(/Unexpected Component/i)).not.toBeInTheDocument();
  });
});
