import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { IResponsible } from '../../../../renderer/interfaces/IResponsible';
import productsReducer from '../../../../renderer/store/products';
import TableCellResponsible from '../../../../renderer/components/Products/TableCellResponsible';
import '@testing-library/jest-dom';

const store = configureStore({
  reducer: {
    products: productsReducer,
  },
});

const singleResponsible: IResponsible[] = [
  {
    id: '1',
    firstName: 'John',
    lastName: 'Doe',
    role: 'Manager',
  },
];

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

const longResponsibles: IResponsible[] = Array.from({ length: 16 }, (_, i) => ({
  id: `${i + 1}`,
  firstName: `LongFirstName${i + 1}`,
  lastName: `LongLastName${i + 1}`,
  role: `LongRole${i + 1}`,
}));

const renderWithRedux = (component: React.ReactElement) => {
  return render(<Provider store={store}>{component}</Provider>);
};

describe('TableCellResponsible Component', () => {
  it('renders a single responsible with a role', () => {
    renderWithRedux(<TableCellResponsible responsibles={singleResponsible} />);

    const responsibleLabel = screen.getByTestId('responsible-label-1');
    expect(responsibleLabel).toBeInTheDocument();
    expect(responsibleLabel).toHaveTextContent('John Doe (Manager)');
  });

  it('renders "n/a" when responsibles array is empty', async () => {
    renderWithRedux(<TableCellResponsible responsibles={[]} />);

    const tableCell = screen.getByText('n/a');
    expect(tableCell).toBeInTheDocument();

    fireEvent.mouseEnter(tableCell);

    await waitFor(() => {
      const popupContent = screen.getByText('n/a');
      expect(popupContent).toBeInTheDocument();
    });
  });

  it('renders "n/a" when responsibles is undefined', async () => {
    renderWithRedux(<TableCellResponsible responsibles={undefined} />);

    const tableCell = screen.getByText('n/a');
    expect(tableCell).toBeInTheDocument();

    fireEvent.mouseEnter(tableCell);

    await waitFor(() => {
      const popupContent = screen.getByText('n/a');
      expect(popupContent).toBeInTheDocument();
    });
  });

  it('stops displaying responsibles when total name length exceeds 300 characters or 15 responsibles', async () => {
    renderWithRedux(<TableCellResponsible responsibles={longResponsibles} />);

    const cellElement = screen.getByTestId('table-cell');
    fireEvent.mouseEnter(cellElement);

    await waitFor(() => {
      const popup = screen.getByTestId('responsibles-popup');
      expect(popup).toBeInTheDocument();

      longResponsibles.slice(0, 7).forEach((responsible) => {
        const popupContent = screen.getByTestId(
          `popup-responsible-${responsible.id}`,
        );
        expect(popupContent).toBeInTheDocument();
      });

      const moreResponsibles = screen.getByTestId('popup-more-responsibles');
      expect(moreResponsibles).toBeInTheDocument();
      expect(moreResponsibles).toHaveTextContent('... and 9 more');
    });
  });

  it('hides the popup when the mouse leaves the cell', async () => {
    renderWithRedux(
      <TableCellResponsible responsibles={responsiblesWithRole} />,
    );

    const responsibleElement = screen.getByTestId('responsible-label-1');
    fireEvent.mouseEnter(responsibleElement);

    await waitFor(() => {
      const popup = document.querySelector('.ui.popup.visible');
      expect(popup).toBeInTheDocument();
    });

    fireEvent.mouseLeave(responsibleElement);

    await waitFor(() => {
      const popup = document.querySelector('.ui.popup.visible');
      expect(popup).not.toBeInTheDocument();
    });
  });

  it('closes the popup when clicking outside the component', async () => {
    renderWithRedux(
      <TableCellResponsible responsibles={responsiblesWithRole} />,
    );

    const responsibleElement = screen.getByTestId('responsible-label-1');
    fireEvent.mouseEnter(responsibleElement);

    await waitFor(() => {
      const popup = document.querySelector('.ui.popup.visible');
      expect(popup).toBeInTheDocument();
    });

    fireEvent.click(document.body);

    await waitFor(() => {
      const popup = document.querySelector('.ui.popup.visible');
      expect(popup).not.toBeInTheDocument();
    });
  });
});
