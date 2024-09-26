import { render, screen } from '@testing-library/react';
import FooterDiscuss from '../../../../renderer/components/Layout/FooterDiscuss';

const mockDiscordUrl = 'https://discord.com/invite/example';

jest.mock('semantic-ui-react', () => ({
  Icon: jest.fn(() => <div>Discord Icon</div>),
  List: {
    Item: jest.fn(() => <div>Discuss</div>),
  },
}));

describe('FooterDiscuss Component', () => {
  beforeAll(() => {
    process.env.APP_DISCORD = mockDiscordUrl;
  });

  it('renders the FooterDiscuss component with a Discord icon and "Discuss" list item', () => {
    render(<FooterDiscuss />);

    expect(screen.getByText('Discord Icon')).toBeInTheDocument();
    expect(screen.getByText(/Discuss/i)).toBeInTheDocument();
  });

  it('does not render any unexpected elements', () => {
    render(<FooterDiscuss />);

    expect(screen.queryByText(/Unexpected Element/i)).not.toBeInTheDocument();
  });
});
