import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import TableCellCreated from '../../../../renderer/components/Products/TableCellCreatedAt'; // Adjust the import path if necessary

describe('TableCellCreated Component', () => {
  const createdAt = '2024-08-01T12:34:56Z'; // Mock createdAt date
  const formattedDate = new Date(createdAt).toLocaleString(); // Expected formatted date

  const renderTableCellCreated = (createdAt: string) => {
    return render(<TableCellCreated createdAt={createdAt} />);
  };

  it('renders the formatted date inside the table cell', () => {
    renderTableCellCreated(createdAt);

    // Check if the cell contains the formatted date
    const tableCell = screen.getByText(formattedDate);
    expect(tableCell).toBeInTheDocument();
  });

  it('shows the popup with the formatted date on hover', async () => {
    renderTableCellCreated(createdAt);

    const tableCell = screen.getByText(formattedDate);
    expect(tableCell).toBeInTheDocument();

    // Simulate mouse hover to trigger the popup
    fireEvent.mouseEnter(tableCell);

    // Wait for the popup to appear
    await waitFor(() => {
      const popup = document.querySelector('.ui.popup.visible');
      expect(popup).toBeInTheDocument();

      // Ensure the formatted date is present in the popup content
      const popupContent = screen.getByText(formattedDate, { selector: '.ui.popup.visible' });
      expect(popupContent).toBeInTheDocument();
    });
  });

  it('hides the popup when mouse leaves the cell', async () => {
    renderTableCellCreated(createdAt);

    const tableCell = screen.getByText(formattedDate);

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
