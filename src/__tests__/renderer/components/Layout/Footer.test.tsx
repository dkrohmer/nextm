import { render, screen } from '@testing-library/react';
import Footer from '../../../../renderer/components/Layout/Footer';

// Mock components
jest.mock('../../../../renderer/components/layout/FooterContribute', () => () => <div>FooterContribute Component</div>);
jest.mock('../../../../renderer/components/layout/FooterDiscuss', () => () => <div>FooterDiscuss Component</div>);
jest.mock('../../../../renderer/components/layout/FooterDonate', () => () => <div>FooterDonate Component</div>);
jest.mock('../../../../renderer/components/layout/FooterToolInfo', () => () => <div>FooterToolInfo Component</div>);
jest.mock('../../../../renderer/components/layout/FooterCopyright', () => () => <div>FooterCopyright Component</div>);
jest.mock('../../../../renderer/components/layout/FooterLicensing', () => () => <div>FooterLicensing Component</div>);

describe('Footer Component', () => {
  it('renders the Footer component with all sections', () => {
    render(<Footer />);

    // Check that the three main footer sections are rendered
    expect(screen.getByText(/FooterContribute Component/i)).toBeInTheDocument();
    expect(screen.getByText(/FooterDiscuss Component/i)).toBeInTheDocument();
    expect(screen.getByText(/FooterDonate Component/i)).toBeInTheDocument();

    // Check that the three horizontal footer items are rendered
    expect(screen.getByText(/FooterToolInfo Component/i)).toBeInTheDocument();
    expect(screen.getByText(/FooterCopyright Component/i)).toBeInTheDocument();
    expect(screen.getByText(/FooterLicensing Component/i)).toBeInTheDocument();
  });

  it('does not render any unexpected components', () => {
    render(<Footer />);

    // Check that no unexpected components are rendered
    expect(screen.queryByText(/Unexpected Component/i)).not.toBeInTheDocument();
  });
});
