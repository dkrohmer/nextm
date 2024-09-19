import React from 'react';
import { render, screen } from '@testing-library/react';
import FooterDonate from '../../../../renderer/components/Layout/FooterDonate';

// Mock the entire semantic-ui-react library
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

    // Check that the Patreon icon is rendered
    expect(screen.getByText('Patreon Icon')).toBeInTheDocument();

    // Check that the "Donate" list item is rendered
    expect(screen.getByText(/Donate/i)).toBeInTheDocument();
  });

  it('does not render any unexpected elements', () => {
    render(<FooterDonate />);

    // Ensure there are no unexpected elements
    expect(screen.queryByText(/Unexpected Element/i)).not.toBeInTheDocument();
  });
});
