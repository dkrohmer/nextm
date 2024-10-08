import { render, screen } from '@testing-library/react';
import { jest } from '@jest/globals';
import Error from '../../../../renderer/components/Product/Error';
import '@testing-library/jest-dom';

const mockUseSelector = jest.fn();

jest.mock('react-redux', () => ({
  useSelector: (selector: any) => mockUseSelector(selector),
}));

describe('Error Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the Error component with the correct content when there is an error', () => {
    mockUseSelector.mockImplementation((selector: any) =>
      selector({
        products: {
          productError: 'Test error message',
        },
      }),
    );

    render(<Error />);

    expect(screen.getByText('Error❗️')).toBeInTheDocument();
    expect(screen.getByText('Test error message')).toBeInTheDocument();
  });

  it('has the correct class names applied', () => {
    mockUseSelector.mockImplementation((selector: any) =>
      selector({
        products: {
          productError: 'Test error message',
        },
      }),
    );

    render(<Error />);

    const messageElement = screen.getByTestId('product-error');
    expect(messageElement).toHaveClass('product-error-message');
    expect(messageElement).toHaveTextContent('Error❗️');
  });

  it('does not render when there is no productError', () => {
    mockUseSelector.mockImplementation((selector: any) =>
      selector({
        products: {
          productError: null,
        },
      }),
    );

    render(<Error />);

    expect(screen.queryByText('Error❗️')).not.toBeInTheDocument();
    expect(screen.queryByText('Test error message')).not.toBeInTheDocument();
  });
});
