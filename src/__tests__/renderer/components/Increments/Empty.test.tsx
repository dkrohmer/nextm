import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { jest } from '@jest/globals';
import Empty from '../../../../renderer/components/Increments/Empty';

// Mock useSelector hook
const mockUseSelector = jest.fn();

jest.mock('react-redux', () => ({
  useSelector: (selector: any) => mockUseSelector(selector),
}));

describe('Empty Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the Empty component with the correct content when increments list is empty', () => {
    // Mock useSelector to simulate the Redux state with empty increments
    mockUseSelector.mockImplementation((selector: any) =>
      selector({
        increments: {
          increments: [],
          incrementsError: null,
          incrementsIsLoading: false,
        },
      }),
    );

    // Render the Empty component
    render(<Empty />);

    // Check for the presence of the header text
    expect(screen.getByText('Increments, anyone? 👀')).toBeInTheDocument();

    // Check for the presence of the body text
    expect(
      screen.getByText('Hang on! Add one by clicking:'),
    ).toBeInTheDocument();

    // Check for the presence of the label text
    expect(screen.getByText('+ Add increment')).toBeInTheDocument();
  });

  it('has the correct class names applied', () => {
    // Mock useSelector to simulate the Redux state with empty increments
    mockUseSelector.mockImplementation((selector: any) =>
      selector({
        increments: {
          increments: [],
          incrementsError: null,
          incrementsIsLoading: false,
        },
      }),
    );

    // Render the Empty component
    render(<Empty />);

    // Check for the presence of the segment with the correct class
    const segmentElement = screen
      .getByText('Increments, anyone? 👀')
      .closest('div');
    expect(segmentElement).toHaveClass('increments-segment');

    // Check for the label with the correct class
    const labelElement = screen.getByText('+ Add increment').closest('div');
    expect(labelElement).toHaveClass('ui label');
  });

  it('does not render when increments are loading', () => {
    // Mock useSelector to simulate loading state
    mockUseSelector.mockImplementation((selector: any) =>
      selector({
        increments: {
          increments: [],
          incrementsError: null,
          incrementsIsLoading: true,
        },
      }),
    );

    // Render the Empty component
    render(<Empty />);

    // Ensure the Empty component is not rendered when loading
    expect(
      screen.queryByText('Increments, anyone? 👀'),
    ).not.toBeInTheDocument();
  });

  it('does not render when there is an increments error', () => {
    // Mock useSelector to simulate an error state
    mockUseSelector.mockImplementation((selector: any) =>
      selector({
        increments: {
          increments: [],
          incrementsError: 'Some error',
          incrementsIsLoading: false,
        },
      }),
    );

    // Render the Empty component
    render(<Empty />);

    // Ensure the Empty component is not rendered when there's an error
    expect(
      screen.queryByText('Increments, anyone? 👀'),
    ).not.toBeInTheDocument();
  });

  it('does not render when increments list is not empty', () => {
    // Mock useSelector to simulate non-empty increments list
    mockUseSelector.mockImplementation((selector: any) =>
      selector({
        increments: {
          increments: [{ id: '1', name: 'Increment 1' }],
          incrementsError: null,
          incrementsIsLoading: false,
        },
      }),
    );

    // Render the Empty component
    render(<Empty />);

    // Ensure the Empty component is not rendered when increments are available
    expect(
      screen.queryByText('Increments, anyone? 👀'),
    ).not.toBeInTheDocument();
  });
});
