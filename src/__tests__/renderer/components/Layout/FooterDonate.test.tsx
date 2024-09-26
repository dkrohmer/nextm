import { render, screen } from '@testing-library/react';
import FooterDonate from '../../../../renderer/components/Layout/FooterDonate';

jest.mock('semantic-ui-react', () => ({
  Icon: jest.fn(() => <div>Patreon Icon</div>),
  List: {
    Item: jest.fn(() => <div>Donate</div>),
  },
}));

describe('FooterDonate Component', () => {
  const mockPatreonUrl = 'https://patreon.com/mock-page';

  beforeAll(() => {
    process.env.APP_PATREON = mockPatreonUrl;
  });

  it('renders the FooterDonate component with a Patreon icon and "Donate" list item', () => {
    render(<FooterDonate />);

    expect(screen.getByText('Patreon Icon')).toBeInTheDocument();
    expect(screen.getByText(/Donate/i)).toBeInTheDocument();
  });

  it('does not render any unexpected elements', () => {
    render(<FooterDonate />);

    expect(screen.queryByText(/Unexpected Element/i)).not.toBeInTheDocument();
  });
});
