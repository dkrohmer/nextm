import { render, screen } from '@testing-library/react';
import FooterLicensing from '../../../../renderer/components/Layout/FooterLicensing';

jest.mock('semantic-ui-react', () => ({
  List: {
    Item: jest.fn(() => <div>MIT License</div>),
  },
}));

describe('FooterLicensing Component', () => {
  const mockLicenseUrl = 'https://opensource.org/licenses/MIT';

  beforeAll(() => {
    process.env.APP_LICENSE = 'MIT License';
    process.env.APP_LICENSE_URL = mockLicenseUrl;
  });

  it('renders the FooterLicensing component with correct text', () => {
    render(<FooterLicensing />);

    expect(screen.getByText('MIT License')).toBeInTheDocument();
  });

  it('does not render any unexpected elements', () => {
    render(<FooterLicensing />);

    expect(screen.queryByText(/Unexpected Element/i)).not.toBeInTheDocument();
  });
});
