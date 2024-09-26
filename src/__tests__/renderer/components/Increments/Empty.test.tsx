import { render, screen } from '@testing-library/react';
import { jest } from '@jest/globals';
import Empty from '../../../../renderer/components/Increments/Empty';
import '@testing-library/jest-dom';

const mockUseSelector = jest.fn();

jest.mock('react-redux', () => ({
  useSelector: (selector: any) => mockUseSelector(selector),
}));

describe('Empty Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the Empty component with the correct content when increments list is empty', () => {
    mockUseSelector.mockImplementation((selector: any) =>
      selector({
        increments: {
          increments: [],
          incrementsError: null,
          incrementsIsLoading: false,
        },
      }),
    );

    render(<Empty />);

    expect(screen.getByText('Increments, anyone? 👀')).toBeInTheDocument();
    expect(screen.getByText('Hang on! Add one by clicking:')).toBeInTheDocument();
    expect(screen.getByText('+ Add increment')).toBeInTheDocument();
  });

  it('has the correct class names applied', () => {
    mockUseSelector.mockImplementation((selector: any) =>
      selector({
        increments: {
          increments: [],
          incrementsError: null,
          incrementsIsLoading: false,
        },
      }),
    );

    render(<Empty />);

    const segmentElement = screen
      .getByText('Increments, anyone? 👀')
      .closest('div');
    expect(segmentElement).toHaveClass('increments-segment');

    const labelElement = screen.getByText('+ Add increment').closest('div');
    expect(labelElement).toHaveClass('ui label');
  });

  it('does not render when increments are loading', () => {
    mockUseSelector.mockImplementation((selector: any) =>
      selector({
        increments: {
          increments: [],
          incrementsError: null,
          incrementsIsLoading: true,
        },
      }),
    );

    render(<Empty />);

    expect(
      screen.queryByText('Increments, anyone? 👀'),
    ).not.toBeInTheDocument();
  });

  it('does not render when there is an increments error', () => {
    mockUseSelector.mockImplementation((selector: any) =>
      selector({
        increments: {
          increments: [],
          incrementsError: 'Some error',
          incrementsIsLoading: false,
        },
      }),
    );

    render(<Empty />);

    expect(
      screen.queryByText('Increments, anyone? 👀'),
    ).not.toBeInTheDocument();
  });

  it('does not render when increments list is not empty', () => {
    mockUseSelector.mockImplementation((selector: any) =>
      selector({
        increments: {
          increments: [{ id: '1', name: 'Increment 1' }],
          incrementsError: null,
          incrementsIsLoading: false,
        },
      }),
    );

    render(<Empty />);

    expect(
      screen.queryByText('Increments, anyone? 👀'),
    ).not.toBeInTheDocument();
  });
});
