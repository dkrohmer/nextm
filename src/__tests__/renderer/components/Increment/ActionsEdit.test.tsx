import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import ActionsEdit from '../../../../renderer/components/Increment/ActionsEdit';
import incrementsReducer from '../../../../renderer/store/increments';
import { IIncrement } from '../../../../renderer/interfaces/IIncrement';

const store = configureStore({
  reducer: {
    increments: incrementsReducer,
  },
});

describe('ActionsEdit Component', () => {
  const mockIncrement: IIncrement = {
    id: '1',
    name: 'Test Increment',
    productId: 'product-123',
    start: '2024-08-01T00:00:00Z',
    end: '2024-08-31T23:59:59Z',
    deadline: '2024-08-15T00:00:00Z',
    state: 'active',
  };

  const renderWithRedux = (component: React.ReactElement) => {
    return render(<Provider store={store}>{component}</Provider>);
  };

  it('renders the edit button and popup content', () => {
    renderWithRedux(<ActionsEdit increment={mockIncrement} number={1} />);

    const editButton = screen.getByRole('button');
    expect(editButton).toBeInTheDocument();
    expect(editButton.querySelector('.pencil.icon')).toBeInTheDocument();

    fireEvent.mouseEnter(editButton);
    expect(screen.getByText(/edit increment/i)).toBeInTheDocument();
    expect(screen.getByText(/"Test Increment"/)).toBeInTheDocument();
  });

  it('dispatches the correct actions when the edit button is clicked', () => {
    renderWithRedux(<ActionsEdit increment={mockIncrement} number={1} />);

    const editButton = screen.getByRole('button');
    fireEvent.click(editButton);

    const actions = store.getState().increments;

    expect(actions.incrementsIsEditing).toBe(true);
    expect(actions.currentIncrement).toEqual(mockIncrement);
    expect(actions.incrementsModalOpen).toBe(true);
  });

  it('hides the popup when the mouse leaves the button', () => {
    renderWithRedux(<ActionsEdit increment={mockIncrement} number={1} />);

    const editButton = screen.getByRole('button');
    fireEvent.mouseEnter(editButton);

    expect(screen.getByText(/edit increment/i)).toBeInTheDocument();

    fireEvent.mouseLeave(editButton);
    expect(screen.queryByText(/edit increment/i)).not.toBeInTheDocument();
  });

  it('closes the popup when onClose is triggered', () => {
    renderWithRedux(<ActionsEdit increment={mockIncrement} number={1} />);

    const editButton = screen.getByRole('button');

    fireEvent.mouseEnter(editButton);
    expect(screen.getByText(/edit increment/i)).toBeInTheDocument();

    fireEvent.click(document.body);

    expect(screen.queryByText(/edit increment/i)).not.toBeInTheDocument();
  });
});
