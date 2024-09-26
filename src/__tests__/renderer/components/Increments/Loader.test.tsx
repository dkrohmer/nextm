import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { jest } from '@jest/globals';
import Loader from '../../../../renderer/components/Increments/Loader';

const mockUseSelector = jest.fn();

jest.mock('react-redux', () => ({
  useSelector: (selector: any) => mockUseSelector(selector),
}));

describe('Loader Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the Loader component when increments are loading', () => {
    mockUseSelector.mockImplementation((selector: any) =>
      selector({
        increments: {
          incrementsIsLoading: true,
        },
      }),
    );

    render(<Loader />);

    const loader = screen.getByTestId('increments-loader');
    expect(loader).toHaveTextContent('Loading Increments...');
    expect(loader).toHaveClass('active');
  });

  it('does not render the Loader component when increments are not loading', () => {
    mockUseSelector.mockImplementation((selector: any) =>
      selector({
        increments: {
          incrementsIsLoading: false,
        },
      }),
    );

    render(<Loader />);

    expect(screen.queryByText('Loading Increments...')).not.toBeInTheDocument();
  });
});
