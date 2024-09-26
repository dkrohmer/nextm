import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { jest } from '@jest/globals';
import Error from '../../../../renderer/components/Increments/Error';

// Mock useSelector hook
const mockUseSelector = jest.fn();

jest.mock('react-redux', () => ({
  useSelector: (selector: any) => mockUseSelector(selector),
}));

describe('Error Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the Error component with the correct content when there is an error', () => {
    // Mock useSelector to simulate the Redux state with an error
    mockUseSelector.mockImplementation((selector: any) =>
      selector({
        increments: {
          incrementsError: 'Test error message',
        },
      }),
    );

    // Render the Error component
    render(<Error />);

    // Check for the presence of the error message header and content
    expect(screen.getByText('Error❗️')).toBeInTheDocument();
    expect(screen.getByText('Test error message')).toBeInTheDocument();
  });

  it('has the correct class names applied', () => {
    // Mock useSelector to simulate the Redux state with an error
    mockUseSelector.mockImplementation((selector: any) =>
      selector({
        increments: {
          incrementsError: 'Test error message',
        },
      }),
    );

    // Render the Error component
    render(<Error />);

    // Check for the presence of the message with the correct class
    const messageElement = screen.getByTestId('increments-error');
    expect(messageElement).toHaveTextContent('Error❗️');
  });

  it('does not render when there is no error', () => {
    // Mock useSelector to simulate no error in Redux state
    mockUseSelector.mockImplementation((selector: any) =>
      selector({
        increments: {
          incrementsError: null,
        },
      }),
    );

    // Render the Error component
    render(<Error />);

    // Ensure the Error component is not rendered when there is no error
    expect(screen.queryByText('Error❗️')).not.toBeInTheDocument();
    expect(screen.queryByText('Test error message')).not.toBeInTheDocument();
  });
});
