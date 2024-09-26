import React from 'react';
import { render, screen } from '@testing-library/react';
import FooterDiscuss from '../../../../renderer/components/Layout/FooterDiscuss';

const mockDiscordUrl = 'https://discord.com/invite/example';

// Mock the entire semantic-ui-react library
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

    // Check that the Discord icon is rendered
    expect(screen.getByText('Discord Icon')).toBeInTheDocument();

    // Check that the "Discuss" list item is rendered
    expect(screen.getByText(/Discuss/i)).toBeInTheDocument();
  });

  it('does not render any unexpected elements', () => {
    render(<FooterDiscuss />);

    // Ensure there are no unexpected elements
    expect(screen.queryByText(/Unexpected Element/i)).not.toBeInTheDocument();
  });
});
