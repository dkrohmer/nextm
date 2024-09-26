import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import TableCellDeadline from '../../../../renderer/components/Products/TableCellDeadline'; // Adjust the import path if necessary

describe('TableCellDeadline Component', () => {
  const validEndsAt = '2024-08-31T23:59:59Z';
  const formattedDate = new Date(validEndsAt).toLocaleDateString(); // Expected formatted date

  const renderTableCellDeadline = (endsAt: string | null | undefined) => {
    return render(<TableCellDeadline endsAt={endsAt} />);
  };

  it('renders the formatted date inside the table cell when endsAt is provided', () => {
    renderTableCellDeadline(validEndsAt);

    // Check if the cell contains the formatted date
    const tableCell = screen.getByText(formattedDate);
    expect(tableCell).toBeInTheDocument();
  });

  it('renders "n/a" when endsAt is null or undefined', () => {
    renderTableCellDeadline(null);

    // Check if the cell contains "n/a"
    const tableCell = screen.getByText('n/a', {
      selector: '.products-table-deadline-cell',
    });
    expect(tableCell).toBeInTheDocument();
  });

  it('shows the popup with the formatted date on hover when endsAt is valid', async () => {
    renderTableCellDeadline(validEndsAt);

    const tableCell = screen.getByText(formattedDate);
    expect(tableCell).toBeInTheDocument();

    // Simulate mouse hover to trigger the popup
    fireEvent.mouseEnter(tableCell);

    // Wait for the popup to appear
    await waitFor(() => {
      const popup = document.querySelector('.ui.popup.visible');
      expect(popup).toBeInTheDocument();

      // Ensure the formatted date is present in the popup content
      const popupContent = screen.getByText(formattedDate, {
        selector: '.ui.popup.visible',
      });
      expect(popupContent).toBeInTheDocument();
    });
  });

  it('shows "n/a" in the popup on hover when endsAt is null', async () => {
    renderTableCellDeadline(null);

    const tableCell = screen.getByText('n/a', {
      selector: '.products-table-deadline-cell',
    });
    expect(tableCell).toBeInTheDocument();

    // Simulate mouse hover to trigger the popup
    fireEvent.mouseEnter(tableCell);

    // Wait for the popup to appear
    await waitFor(() => {
      const popup = document.querySelector('.ui.popup.visible');
      expect(popup).toBeInTheDocument();

      // Ensure "n/a" is present in the popup content
      const popupContent = screen.getByText('n/a', {
        selector: '.ui.popup.visible',
      });
      expect(popupContent).toBeInTheDocument();
    });
  });

  it('hides the popup when mouse leaves the cell', async () => {
    renderTableCellDeadline(validEndsAt);

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
