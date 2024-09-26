import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { jest } from '@jest/globals';
import Empty from '../../../../renderer/components/Models/Empty'; // Adjust the path as needed

// Mock useSelector hook
const mockUseSelector = jest.fn();

jest.mock('react-redux', () => ({
  useSelector: (selector: any) => mockUseSelector(selector),
}));

describe('Models Empty Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the Empty component with the correct content when models list is empty', () => {
    // Mock useSelector to simulate the Redux state with empty models
    mockUseSelector.mockImplementation((selector: any) =>
      selector({
        models: {
          models: [],
          modelsError: null,
          modelsIsLoading: false,
        },
      }),
    );

    // Render the Empty component
    render(<Empty />);

    // Check for the presence of the header text
    expect(
      screen.getByText('No threat models here yet 😔'),
    ).toBeInTheDocument();

    // Check for the presence of the body text
    expect(screen.getByText('Add one by clicking')).toBeInTheDocument();

    // Check for the presence of the label text
    expect(screen.getByText('+ Add Threat Model')).toBeInTheDocument();
  });

  it('does not render when models are loading', () => {
    // Mock useSelector to simulate loading state
    mockUseSelector.mockImplementation((selector: any) =>
      selector({
        models: {
          models: [],
          modelsError: null,
          modelsIsLoading: true,
        },
      }),
    );

    // Render the Empty component
    render(<Empty />);

    // Ensure the Empty component is not rendered when loading
    expect(
      screen.queryByText('No threat models here yet 😔'),
    ).not.toBeInTheDocument();
  });

  it('does not render when there is a models error', () => {
    // Mock useSelector to simulate an error state
    mockUseSelector.mockImplementation((selector: any) =>
      selector({
        models: {
          models: [],
          modelsError: 'Some error',
          modelsIsLoading: false,
        },
      }),
    );

    // Render the Empty component
    render(<Empty />);

    // Ensure the Empty component is not rendered when there's an error
    expect(
      screen.queryByText('No threat models here yet 😔'),
    ).not.toBeInTheDocument();
  });

  it('does not render when models list is not empty', () => {
    // Mock useSelector to simulate non-empty models list
    mockUseSelector.mockImplementation((selector: any) =>
      selector({
        models: {
          models: [{ id: '1', name: 'Model 1' }],
          modelsError: null,
          modelsIsLoading: false,
        },
      }),
    );

    // Render the Empty component
    render(<Empty />);

    // Ensure the Empty component is not rendered when models are available
    expect(
      screen.queryByText('No threat models here yet 😔'),
    ).not.toBeInTheDocument();
  });
});
