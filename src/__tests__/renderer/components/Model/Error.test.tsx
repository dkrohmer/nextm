import { render, screen } from '@testing-library/react';
import ModelError from '../../../../renderer/components/Model/Error';
import '@testing-library/jest-dom';

describe('ModelError Component', () => {
  it('renders the error message when an error is provided', () => {
    const testError = 'Something went wrong!';

    render(<ModelError error={testError} />);

    expect(screen.getByText(/Error❗️/i)).toBeInTheDocument();
    expect(screen.getByText(testError)).toBeInTheDocument();
  });

  it('does not render anything when there is no error', () => {
    render(<ModelError error={null} />);

    expect(screen.queryByText(/Error❗️/i)).not.toBeInTheDocument();
    expect(
      screen.queryByText(/Something went wrong!/i),
    ).not.toBeInTheDocument();
  });

  it('does not render anything when the error is an empty string', () => {
    render(<ModelError error="" />);

    expect(screen.queryByText(/Error❗️/i)).not.toBeInTheDocument();
    expect(
      screen.queryByText(/Something went wrong!/i),
    ).not.toBeInTheDocument();
  });
});
