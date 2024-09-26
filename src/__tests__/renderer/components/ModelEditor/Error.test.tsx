import { render, screen } from '@testing-library/react';
import Error from '../../../../renderer/components/ModelEditor/Error';
import '@testing-library/jest-dom';

describe('Error Component', () => {
  it('renders the Error component with multiple non-null error messages', () => {
    const errors = ['Error 1 occurred!', 'Error 2 occurred!'];

    render(<Error errors={errors} />);

    expect(screen.getByText('Error 1 occurred!')).toBeInTheDocument();
    expect(screen.getByText('Error 2 occurred!')).toBeInTheDocument();
    expect(screen.getByText('Error')).toBeInTheDocument();

    const messageElement = screen.getByText('Error 1 occurred!').closest('div');
    expect(messageElement).toHaveClass('ui negative message');
  });

  it('does not render anything when errors array is empty', () => {
    render(<Error errors={[]} />);

    expect(screen.queryByText('Error')).toBeNull();
    expect(screen.queryByText('Error 1 occurred!')).toBeNull();
    expect(screen.queryByText('Error 2 occurred!')).toBeNull();
  });

  it('renders correctly with some non-null error messages and some null values', () => {
    const errors = [null, 'Some error occurred!', 'Another error', null];

    render(<Error errors={errors} />);

    expect(screen.getByText('Some error occurred!')).toBeInTheDocument();
    expect(screen.getByText('Another error')).toBeInTheDocument();
    expect(screen.getByText('Error')).toBeInTheDocument();
    expect(screen.queryByText('null')).toBeNull();
  });

  it('does not render anything when all error messages are null', () => {
    render(<Error errors={[null, null]} />);

    expect(screen.queryByText('Error')).toBeNull();
    expect(screen.queryByText('Error 1 occurred!')).toBeNull();
    expect(screen.queryByText('Another error')).toBeNull();
  });
});
