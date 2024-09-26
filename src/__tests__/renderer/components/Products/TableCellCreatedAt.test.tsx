import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import TableCellCreated from '../../../../renderer/components/Products/TableCellCreatedAt';
import '@testing-library/jest-dom';

describe('TableCellCreated Component', () => {
  const createdAt = '2024-08-01T12:34:56Z';
  const formattedDate = new Date(createdAt).toLocaleString();

  const renderTableCellCreated = (createdAt: string) => {
    return render(<TableCellCreated createdAt={createdAt} />);
  };

  it('renders the formatted date inside the table cell', () => {
    renderTableCellCreated(createdAt);

    const tableCell = screen.getByText(formattedDate);
    expect(tableCell).toBeInTheDocument();
  });

  it('shows the popup with the formatted date on hover', async () => {
    renderTableCellCreated(createdAt);

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

  it('hides the popup when mouse leaves the cell', async () => {
    renderTableCellCreated(createdAt);

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
