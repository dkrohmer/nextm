import { render, screen } from '@testing-library/react';
import { jest } from '@jest/globals';
import Empty from '../../../../renderer/components/Models/Empty';
import '@testing-library/jest-dom';

const mockUseSelector = jest.fn();

jest.mock('react-redux', () => ({
  useSelector: (selector: any) => mockUseSelector(selector),
}));

describe('Models Empty Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the Empty component with the correct content when models list is empty', () => {
    mockUseSelector.mockImplementation((selector: any) =>
      selector({
        models: {
          models: [],
          modelsError: null,
          modelsIsLoading: false,
        },
      }),
    );

    render(<Empty />);

    expect(
      screen.getByText('No threat models here yet 😔'),
    ).toBeInTheDocument();

    expect(screen.getByText('Add one by clicking')).toBeInTheDocument();

    expect(screen.getByText('+ Add Threat Model')).toBeInTheDocument();
  });

  it('does not render when models are loading', () => {
    mockUseSelector.mockImplementation((selector: any) =>
      selector({
        models: {
          models: [],
          modelsError: null,
          modelsIsLoading: true,
        },
      }),
    );

    render(<Empty />);

    expect(
      screen.queryByText('No threat models here yet 😔'),
    ).not.toBeInTheDocument();
  });

  it('does not render when there is a models error', () => {
    mockUseSelector.mockImplementation((selector: any) =>
      selector({
        models: {
          models: [],
          modelsError: 'Some error',
          modelsIsLoading: false,
        },
      }),
    );

    render(<Empty />);

    expect(
      screen.queryByText('No threat models here yet 😔'),
    ).not.toBeInTheDocument();
  });

  it('does not render when models list is not empty', () => {
    mockUseSelector.mockImplementation((selector: any) =>
      selector({
        models: {
          models: [{ id: '1', name: 'Model 1' }],
          modelsError: null,
          modelsIsLoading: false,
        },
      }),
    );

    render(<Empty />);

    expect(
      screen.queryByText('No threat models here yet 😔'),
    ).not.toBeInTheDocument();
  });
});
