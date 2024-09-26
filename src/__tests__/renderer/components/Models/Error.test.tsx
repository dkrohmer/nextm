import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { jest } from '@jest/globals';
import Error from '../../../../renderer/components/Models/Error'; // Adjust the path if needed

// Mock useSelector hook
const mockUseSelector = jest.fn();

jest.mock('react-redux', () => ({
  useSelector: (selector: any) => mockUseSelector(selector),
}));

describe('Models Error Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the Error component with the correct content when there is a models error', () => {
    // Mock useSelector to simulate the Redux state with a models error
    mockUseSelector.mockImplementation((selector: any) =>
      selector({
        models: {
          modelsError: 'Test models error message',
        },
      }),
    );

    // Render the Error component
    render(<Error />);

    // Check for the presence of the error message header and content
    expect(screen.getByText('Error❗️')).toBeInTheDocument();
    expect(screen.getByText('Test models error message')).toBeInTheDocument();
  });

  it('has the correct class names applied', () => {
    // Mock useSelector to simulate the Redux state with a models error
    mockUseSelector.mockImplementation((selector: any) =>
      selector({
        models: {
          modelsError: 'Test models error message',
        },
      }),
    );

    // Render the Error component
    render(<Error />);

    // Check for the presence of the message with the correct class
    const messageElement = screen.getByTestId('models-error');
    expect(messageElement).toHaveClass('models-message');
  });

  it('does not render when there is no models error', () => {
    // Mock useSelector to simulate no error in the Redux state
    mockUseSelector.mockImplementation((selector: any) =>
      selector({
        models: {
          modelsError: null,
        },
      }),
    );

    // Render the Error component
    render(<Error />);

    // Ensure the Error component is not rendered when there is no error
    expect(screen.queryByText('Error❗️')).not.toBeInTheDocument();
    expect(
      screen.queryByText('Test models error message'),
    ).not.toBeInTheDocument();
  });
});
