import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import TableCellDeadline from '../../../../renderer/components/Products/TableCellDeadline';
import '@testing-library/jest-dom';

describe('TableCellDeadline Component', () => {
  const validEndsAt = '2024-08-31T23:59:59Z';
  const formattedDate = new Date(validEndsAt).toLocaleDateString();

  const renderTableCellDeadline = (endsAt: string | null | undefined) => {
    return render(<TableCellDeadline endsAt={endsAt} />);
  };

  it('renders the formatted date inside the table cell when endsAt is provided', () => {
    renderTableCellDeadline(validEndsAt);

    const tableCell = screen.getByText(formattedDate);
    expect(tableCell).toBeInTheDocument();
  });

  it('renders "n/a" when endsAt is null or undefined', () => {
    renderTableCellDeadline(null);

    const tableCell = screen.getByText('n/a', {
      selector: '.products-table-deadline-cell',
    });
    expect(tableCell).toBeInTheDocument();
  });

  it('shows the popup with the formatted date on hover when endsAt is valid', async () => {
    renderTableCellDeadline(validEndsAt);

    const tableCell = screen.getByText(formattedDate);
    expect(tableCell).toBeInTheDocument();

    fireEvent.mouseEnter(tableCell);

    await waitFor(() => {
      const popup = document.querySelector('.ui.popup.visible');
      expect(popup).toBeInTheDocument();

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

    fireEvent.mouseEnter(tableCell);

    await waitFor(() => {
      const popup = document.querySelector('.ui.popup.visible');
      expect(popup).toBeInTheDocument();

      const popupContent = screen.getByText('n/a', {
        selector: '.ui.popup.visible',
      });
      expect(popupContent).toBeInTheDocument();
    });
  });

  it('hides the popup when mouse leaves the cell', async () => {
    renderTableCellDeadline(validEndsAt);

    const tableCell = screen.getByText(formattedDate);

    fireEvent.mouseEnter(tableCell);
    await waitFor(() => {
      const popup = document.querySelector('.ui.popup.visible');
      expect(popup).toBeInTheDocument();
    });

    fireEvent.mouseLeave(tableCell);

    await waitFor(() => {
      const popup = document.querySelector('.ui.popup.visible');
      expect(popup).not.toBeInTheDocument();
    });
  });
});
