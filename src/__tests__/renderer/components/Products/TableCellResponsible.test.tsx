import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import TableCellResponsible from '../../../../renderer/components/Products/TableCellResponsible'; // Adjust the import path if necessary
import { IResponsible } from '../../../../renderer/interfaces/IResponsible';

describe('TableCellResponsible Component', () => {
  const responsiblesWithRole: IResponsible[] = [
    {
      id: '1',
      firstName: 'John',
      lastName: 'Doe',
      role: 'Manager',
    },
    {
      id: '2',
      firstName: 'Jane',
      lastName: 'Smith',
      role: 'Engineer',
    },
  ];

  const responsiblesWithoutRole: IResponsible[] = [
    {
      id: '3',
      firstName: 'Alice',
      lastName: 'Johnson',
      role: '', // No role provided
    },
    {
      id: '4',
      firstName: 'Bob',
      lastName: 'Williams',
      role: undefined
    },
  ];

  const formattedResponsiblesWithRole = 'John Doe (Manager), Jane Smith (Engineer)';
  const formattedResponsiblesWithoutRole = 'Alice Johnson, Bob Williams';

  const renderTableCellResponsible = (responsibles: IResponsible[] | undefined) => {
    return render(<TableCellResponsible responsibles={responsibles} />);
  };

  it('renders the responsibles with roles as labels inside the table cell', () => {
    renderTableCellResponsible(responsiblesWithRole);

    // Check if the responsibles with roles are rendered inside the table cell as labels
    responsiblesWithRole.forEach(responsible => {
      expect(screen.getByText(`${responsible.firstName} ${responsible.lastName} (${responsible.role})`)).toBeInTheDocument();
    });
  });

  it('renders the responsibles without roles as labels inside the table cell', () => {
    renderTableCellResponsible(responsiblesWithoutRole);

    // Check if the responsibles without roles are rendered inside the table cell
    responsiblesWithoutRole.forEach(responsible => {
      expect(screen.getByText(`${responsible.firstName} ${responsible.lastName}`)).toBeInTheDocument();
    });
  });

  it('renders "n/a" when responsibles array is empty or undefined', () => {
    renderTableCellResponsible(undefined);

    // Check if "n/a" is rendered inside the cell
    const tableCell = screen.getByText('n/a');
    expect(tableCell).toBeInTheDocument();
  });

  it('shows the popup with the formatted responsibles on hover when responsibles with roles are provided', async () => {
    renderTableCellResponsible(responsiblesWithRole);

    const tableCell = screen.getByText('John Doe (Manager)');

    // Simulate mouse hover to trigger the popup
    fireEvent.mouseEnter(tableCell);

    // Wait for the popup to appear
    await waitFor(() => {
      const popup = document.querySelector('.ui.popup.visible');
      expect(popup).toBeInTheDocument();

      // Ensure the formatted responsibles with roles are present in the popup content
      const popupContent = screen.getByText(formattedResponsiblesWithRole, { selector: '.ui.popup.visible' });
      expect(popupContent).toBeInTheDocument();
    });
  });

  it('shows the popup with the formatted responsibles on hover when responsibles without roles are provided', async () => {
    renderTableCellResponsible(responsiblesWithoutRole);

    const tableCell = screen.getByText('Alice Johnson');

    // Simulate mouse hover to trigger the popup
    fireEvent.mouseEnter(tableCell);

    // Wait for the popup to appear
    await waitFor(() => {
      const popup = document.querySelector('.ui.popup.visible');
      expect(popup).toBeInTheDocument();

      // Ensure the formatted responsibles without roles are present in the popup content
      const popupContent = screen.getByText(formattedResponsiblesWithoutRole, { selector: '.ui.popup.visible' });
      expect(popupContent).toBeInTheDocument();
    });
  });

  it('shows "n/a" in the popup on hover when responsibles are undefined', async () => {
    renderTableCellResponsible(undefined);

    const tableCell = screen.getByText('n/a', { selector: '.products-table-responsibles-cell' });
    expect(tableCell).toBeInTheDocument();

    // Simulate mouse hover to trigger the popup
    fireEvent.mouseEnter(tableCell);

    // Wait for the popup to appear and check for "n/a" content
    await waitFor(() => {
      const popup = document.querySelector('.ui.popup.visible');
      expect(popup).toBeInTheDocument();

      // Ensure "n/a" is present in the popup content
      const popupContent = screen.getByText('n/a', { selector: '.ui.popup.visible' });
      expect(popupContent).toBeInTheDocument();
    });
  });

  it('hides the popup when mouse leaves the cell', async () => {
    renderTableCellResponsible(responsiblesWithRole);

    const tableCell = screen.getByText('John Doe (Manager)');

    // Simulate mouse hover to show the popup
    fireEvent.mouseEnter(tableCell);
    await waitFor(() => {
      const popup = document.querySelector('.ui.popup.visible');
      expect(popup).toBeInTheDocument();
    });

    // Simulate mouse leave to hide the popup
    fireEvent.mouseLeave(tableCell);

    // Wait for the popup to disappear
    await waitFor(() => {
      const popup = document.querySelector('.ui.popup.visible');
      expect(popup).not.toBeInTheDocument();
    });
  });
});
