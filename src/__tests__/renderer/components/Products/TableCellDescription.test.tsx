import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Table } from 'semantic-ui-react';
import TableCellDescription from '../../../../renderer/components/Products/TableCellDescription';
import '@testing-library/jest-dom';

const renderTableCellDescription = (description: string | null | undefined) => {
  return render(
    <Table>
      <TableCellDescription description={description} />
    </Table>,
  );
};

describe('TableCellDescription Component', () => {
  it('renders "n/a" in the table cell when description is null or undefined', () => {
    renderTableCellDescription(null);

    const cellDiv = screen.getByText('n/a', {
      selector: '.products-table-description-cell',
    });
    expect(cellDiv).toBeInTheDocument();
  });

  it('shows "n/a" in the popup on hover when description is null', async () => {
    renderTableCellDescription(null);

    const cellDiv = screen.getByText('n/a', {
      selector: '.products-table-description-cell',
    });
    expect(cellDiv).toBeInTheDocument();

    fireEvent.mouseEnter(cellDiv);

    await waitFor(() => {
      const popup = document.querySelector('.ui.popup.visible');
      expect(popup).toBeInTheDocument();

      const popupContent = screen.getByText('n/a', { selector: '.content' });
      expect(popupContent).toBeInTheDocument();
    });
  });

  it('hides the popup when the mouse leaves the cell', async () => {
    renderTableCellDescription('This is a test description');

    const cellDiv = screen.getByText('This is a test description');

    fireEvent.mouseEnter(cellDiv);
    await waitFor(() => {
      const popup = document.querySelector('.ui.popup.visible');
      expect(popup).toBeInTheDocument();
    });

    fireEvent.mouseLeave(cellDiv);

    await waitFor(() => {
      const popup = document.querySelector('.ui.popup.visible');
      expect(popup).not.toBeInTheDocument();
    });
  });

  it('truncates the description in the popup if it is longer than 500 characters', async () => {
    const longDescription = 'A'.repeat(501);

    renderTableCellDescription(longDescription);

    const cellDiv = screen.getByText(longDescription, {
      selector: '.products-table-description-cell',
    });
    expect(cellDiv).toBeInTheDocument();

    fireEvent.mouseEnter(cellDiv);

    await waitFor(() => {
      const popup = document.querySelector('.ui.popup.visible');
      expect(popup).toBeInTheDocument();

      const truncatedDescription = `${longDescription.slice(0, 499)}...`;
      const popupContent = screen.getByText(truncatedDescription, {
        selector: '.content',
      });
      expect(popupContent).toBeInTheDocument();
    });
  });
});
