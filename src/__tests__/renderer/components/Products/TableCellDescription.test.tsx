import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Table } from 'semantic-ui-react';
import TableCellDescription from '../../../../renderer/components/Products/TableCellDescription';

// Helper function to render the component
const renderTableCellDescription = (description: string | null | undefined) => {
  return render(
    <Table>
      <TableCellDescription description={description} />
    </Table>
  );
};

describe('TableCellDescription Component', () => {
  it('renders "n/a" in the table cell when description is null or undefined', () => {
    renderTableCellDescription(null);

    // Check if "n/a" is rendered inside the cell
    const cellDiv = screen.getByText('n/a', { selector: '.products-table-description-cell' });
    expect(cellDiv).toBeInTheDocument();
  });

  it('shows "n/a" in the popup on hover when description is null', async () => {
    renderTableCellDescription(null);

    // Get the cell content
    const cellDiv = screen.getByText('n/a', { selector: '.products-table-description-cell' });
    expect(cellDiv).toBeInTheDocument();

    // Simulate mouse hover to trigger the popup
    fireEvent.mouseEnter(cellDiv);

    // Wait for the popup to appear
    await waitFor(() => {
      const popup = document.querySelector('.ui.popup.visible');
      expect(popup).toBeInTheDocument();

      // Ensure "n/a" is present in the popup content
      const popupContent = screen.getByText('n/a', { selector: '.content' });
      expect(popupContent).toBeInTheDocument();
    });
  });

  it('hides the popup when the mouse leaves the cell', async () => {
    renderTableCellDescription('This is a test description');

    const cellDiv = screen.getByText('This is a test description');

    // Simulate mouse hover to show the popup
    fireEvent.mouseEnter(cellDiv);
    await waitFor(() => {
      const popup = document.querySelector('.ui.popup.visible');
      expect(popup).toBeInTheDocument();
    });

    // Simulate mouse leave to hide the popup
    fireEvent.mouseLeave(cellDiv);

    // Wait for the popup to disappear
    await waitFor(() => {
      const popup = document.querySelector('.ui.popup.visible');
      expect(popup).not.toBeInTheDocument();
    });
  });
});
