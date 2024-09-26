import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import ActionsDelete from '../../../../renderer/components/Increment/ActionsDelete';
import incrementsReducer from '../../../../renderer/store/increments';
import { IIncrement } from '../../../../renderer/interfaces/IIncrement';

// Setup a test store with only the necessary slices
const store = configureStore({
  reducer: {
    increments: incrementsReducer,
  },
});

describe('ActionsDelete Component', () => {
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

  it('renders the delete button and popup content', () => {
    renderWithRedux(<ActionsDelete increment={mockIncrement} number={1} />);

    // Verify the button is rendered
    const deleteButton = screen.getByRole('button');
    expect(deleteButton).toBeInTheDocument();
    expect(deleteButton.querySelector('.trash.icon')).toBeInTheDocument(); // Check for the trash icon

    // Simulate hover and check if the popup is displayed
    fireEvent.mouseEnter(deleteButton);
    expect(screen.getByText(/delete increment/i)).toBeInTheDocument();
    expect(screen.getByText(/"Test Increment"/)).toBeInTheDocument();
  });

  it('dispatches the correct actions when the delete button is clicked', () => {
    renderWithRedux(<ActionsDelete increment={mockIncrement} number={1} />);

    const deleteButton = screen.getByRole('button');
    fireEvent.click(deleteButton);

    const actions = store.getState().increments;

    expect(actions.incrementToDelete).toBe(mockIncrement.id);
    expect(actions.incrementsConfirmOpen).toBe(true);
  });

  it('hides the popup when the mouse leaves the button', () => {
    renderWithRedux(<ActionsDelete increment={mockIncrement} number={1} />);

    const deleteButton = screen.getByRole('button');
    fireEvent.mouseEnter(deleteButton);

    // Ensure popup is visible on hover
    expect(screen.getByText(/delete increment/i)).toBeInTheDocument();

    // Simulate mouse leave
    fireEvent.mouseLeave(deleteButton);

    // Ensure popup is hidden
    expect(screen.queryByText(/delete increment/i)).not.toBeInTheDocument();
  });

  it('closes the popup when onClose is triggered', () => {
    renderWithRedux(<ActionsDelete increment={mockIncrement} number={1} />);

    const deleteButton = screen.getByRole('button');

    // Simulate hover to open the popup
    fireEvent.mouseEnter(deleteButton);
    expect(screen.getByText(/delete increment/i)).toBeInTheDocument();

    // Simulate onClose event
    fireEvent.click(document.body); // clicking outside should trigger onClose

    // Ensure popup is hidden
    expect(screen.queryByText(/delete increment/i)).not.toBeInTheDocument();
  });
});
