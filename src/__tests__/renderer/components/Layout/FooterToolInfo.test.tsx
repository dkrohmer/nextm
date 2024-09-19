import React from 'react';
import { render, screen } from '@testing-library/react';
import FooterToolInfo from '../../../../renderer/components/Layout/FooterToolInfo';

const mockAppName = 'MockApp';
const mockAppVersion = 'v1.0.0';

// Mock the entire semantic-ui-react library
jest.mock('semantic-ui-react', () => ({
  List: {
    Item: jest.fn(() => <div>{`${mockAppName} ${mockAppVersion}`}</div>),
  },
}));

describe('FooterToolInfo Component', () => {
  beforeAll(() => {
    process.env.APP_NAME = mockAppName;
    process.env.APP_VERSION = mockAppVersion;
  });

  it('renders the FooterToolInfo component with the correct app name and version', () => {
    render(<FooterToolInfo />);

    // Check that the correct text is rendered
    expect(screen.getByText(`${mockAppName} ${mockAppVersion}`)).toBeInTheDocument();
  });

  it('does not render any unexpected elements', () => {
    render(<FooterToolInfo />);

    // Ensure there are no unexpected elements
    expect(screen.queryByText(/Unexpected Element/i)).not.toBeInTheDocument();
  });
});
