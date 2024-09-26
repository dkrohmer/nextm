import { render, screen } from '@testing-library/react';
import { jest } from '@jest/globals';
import Error from '../../../../renderer/components/Models/Error';
import '@testing-library/jest-dom';

const mockUseSelector = jest.fn();

jest.mock('react-redux', () => ({
  useSelector: (selector: any) => mockUseSelector(selector),
}));

describe('Models Error Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the Error component with the correct content when there is a models error', () => {
    mockUseSelector.mockImplementation((selector: any) =>
      selector({
        models: {
          modelsError: 'Test models error message',
        },
      }),
    );

    render(<Error />);

    expect(screen.getByText('Error❗️')).toBeInTheDocument();
    expect(screen.getByText('Test models error message')).toBeInTheDocument();
  });

  it('has the correct class names applied', () => {
    mockUseSelector.mockImplementation((selector: any) =>
      selector({
        models: {
          modelsError: 'Test models error message',
        },
      }),
    );

    render(<Error />);

    const messageElement = screen.getByTestId('models-error');
    expect(messageElement).toHaveClass('models-message');
  });

  it('does not render when there is no models error', () => {
    mockUseSelector.mockImplementation((selector: any) =>
      selector({
        models: {
          modelsError: null,
        },
      }),
    );

    render(<Error />);

    expect(screen.queryByText('Error❗️')).not.toBeInTheDocument();
    expect(
      screen.queryByText('Test models error message'),
    ).not.toBeInTheDocument();
  });
});
