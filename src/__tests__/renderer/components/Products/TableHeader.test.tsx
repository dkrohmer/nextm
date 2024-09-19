import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import TableHeaders from '../../../../renderer/components/Products/TableHeaders'; // Adjust the import path if necessary

describe('TableHeaders Component', () => {
  it('renders the correct table headers', () => {
    render(<TableHeaders />);

    // Check if each header cell is rendered
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Description')).toBeInTheDocument();
    expect(screen.getByText('Responsible(s)')).toBeInTheDocument();
    expect(screen.getByText('Deadline')).toBeInTheDocument();
    expect(screen.getByText('Created at')).toBeInTheDocument();
    expect(screen.getByText('Actions')).toBeInTheDocument();
  });
});
