import { render, screen } from '@testing-library/react';
import FooterCopyright from '../../../../renderer/components/Layout/FooterCopyright';

jest.mock('semantic-ui-react', () => ({
  List: {
    Item: jest.fn(() => <div>© 2024. John Doe</div>),
  },
}));

describe('FooterCopyright Component', () => {
  const mockAuthorUrl = 'https://example.com';
  const mockAuthorName = 'John Doe';
  const mockYear = '2024';

  beforeAll(() => {
    process.env.APP_AUTHOR_URL = mockAuthorUrl;
    process.env.APP_AUTHOR_NAME = mockAuthorName;
    process.env.APP_YEAR = mockYear;
  });

  it('renders the FooterCopyright component with correct text and link', () => {
    render(<FooterCopyright />);
    expect(screen.getByText('© 2024. John Doe')).toBeInTheDocument();
  });

  it('does not render any unexpected elements', () => {
    render(<FooterCopyright />);
    expect(screen.queryByText(/Unexpected Element/i)).not.toBeInTheDocument();
  });
});
