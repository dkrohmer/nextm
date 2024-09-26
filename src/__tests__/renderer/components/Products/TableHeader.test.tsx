import { render, screen } from '@testing-library/react';
import TableHeaders from '../../../../renderer/components/Products/TableHeaders';
import '@testing-library/jest-dom';

describe('TableHeaders Component', () => {
  it('renders the correct table headers', () => {
    render(<TableHeaders />);

    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Description')).toBeInTheDocument();
    expect(screen.getByText('Responsible(s)')).toBeInTheDocument();
    expect(screen.getByText('Deadline')).toBeInTheDocument();
    expect(screen.getByText('Created at')).toBeInTheDocument();
    expect(screen.getByText('Actions')).toBeInTheDocument();
  });
});
