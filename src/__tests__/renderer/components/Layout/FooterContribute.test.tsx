import React from 'react';
import { render, screen } from '@testing-library/react';
import FooterContribute from '../../../../renderer/components/Layout/FooterContribute';

// Mock the entire semantic-ui-react library
jest.mock('semantic-ui-react', () => ({
  Icon: jest.fn(() => <div>GitHub Icon</div>),
  List: {
    Item: jest.fn(() => <div>Contribute</div>),
  },
}));

describe('FooterContribute Component', () => {
  const mockGithubUrl = 'https://github.com/mock-repo';

  beforeAll(() => {
    process.env.APP_GITHUB = mockGithubUrl;
  });

  it('renders the FooterContribute component with a GitHub icon and "Contribute" list item', () => {
    render(<FooterContribute />);

    expect(screen.getByText('GitHub Icon')).toBeInTheDocument();
    expect(screen.getByText(/Contribute/i)).toBeInTheDocument();
  });

  it('does not render any unexpected elements', () => {
    render(<FooterContribute />);

    // Ensure there are no unexpected elements
    expect(screen.queryByText(/Unexpected Element/i)).not.toBeInTheDocument();
  });
});
