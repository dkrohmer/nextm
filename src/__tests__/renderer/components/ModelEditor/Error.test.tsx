import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Error from '../../../../renderer/components/ModelEditor/Error'; // Adjust the import path if necessary

describe('Error Component', () => {
  it('renders the Error component with multiple non-null error messages', () => {
    const errors = ['Error 1 occurred!', 'Error 2 occurred!'];

    // Render the Error component with multiple errors
    render(<Error errors={errors} />);

    // Check for the presence of each error message
    expect(screen.getByText('Error 1 occurred!')).toBeInTheDocument();
    expect(screen.getByText('Error 2 occurred!')).toBeInTheDocument();

    // Check for the presence of the Error header
    expect(screen.getByText('Error')).toBeInTheDocument();

    // Check that the message container has the correct style
    const messageElement = screen.getByText('Error 1 occurred!').closest('div');
    expect(messageElement).toHaveClass('ui negative message');
  });

  it('does not render anything when errors array is empty', () => {
    // Render the Error component with an empty errors array
    render(<Error errors={[]} />);

    // Check that no error messages are rendered
    expect(screen.queryByText('Error')).toBeNull();
    expect(screen.queryByText('Error 1 occurred!')).toBeNull();
    expect(screen.queryByText('Error 2 occurred!')).toBeNull();
  });

  it('renders correctly with some non-null error messages and some null values', () => {
    const errors = [null, 'Some error occurred!', 'Another error', null];

    // Render the Error component with some non-null and null errors
    render(<Error errors={errors} />);

    // Check for the presence of the non-null error messages
    expect(screen.getByText('Some error occurred!')).toBeInTheDocument();
    expect(screen.getByText('Another error')).toBeInTheDocument();

    // Check for the presence of the Error header
    expect(screen.getByText('Error')).toBeInTheDocument();

    // Check that null messages are not displayed
    expect(screen.queryByText('null')).toBeNull();
  });

  it('does not render anything when all error messages are null', () => {
    // Render the Error component with all null errors
    render(<Error errors={[null, null]} />);

    // Check that no error messages are rendered
    expect(screen.queryByText('Error')).toBeNull();
    expect(screen.queryByText('Error 1 occurred!')).toBeNull();
    expect(screen.queryByText('Another error')).toBeNull();
  });
});
