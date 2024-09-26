import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { jest } from '@jest/globals';
import Loader from '../../../../renderer/components/Increments/Loader';

// Mock useSelector hook
const mockUseSelector = jest.fn();

jest.mock('react-redux', () => ({
  useSelector: (selector: any) => mockUseSelector(selector),
}));

describe('Loader Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the Loader component when increments are loading', () => {
    // Mock useSelector to simulate the Redux state where increments are loading
    mockUseSelector.mockImplementation((selector: any) =>
      selector({
        increments: {
          incrementsIsLoading: true,
        },
      }),
    );

    // Render the Loader component
    render(<Loader />);

    const loader = screen.getByTestId('increments-loader');
    // Check for the presence of the Loader with the correct text
    expect(loader).toHaveTextContent('Loading Increments...');
    expect(loader).toHaveClass('active');
  });

  it('does not render the Loader component when increments are not loading', () => {
    // Mock useSelector to simulate the Redux state where increments are not loading
    mockUseSelector.mockImplementation((selector: any) =>
      selector({
        increments: {
          incrementsIsLoading: false,
        },
      }),
    );

    // Render the Loader component
    render(<Loader />);

    // Ensure the Loader is not rendered when not loading
    expect(screen.queryByText('Loading Increments...')).not.toBeInTheDocument();
  });
});
