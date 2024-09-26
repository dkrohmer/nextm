import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import ActionsClone from '../../../../renderer/components/Increment/ActionsClone';
import incrementsReducer from '../../../../renderer/store/increments';
import { IIncrement } from '../../../../renderer/interfaces/IIncrement';

// Setup a test store with only the necessary slices
const store = configureStore({
  reducer: {
    increments: incrementsReducer,
  },
});

describe('ActionsClone Component', () => {
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

  it('renders the clone button and popup content', () => {
    renderWithRedux(<ActionsClone increment={mockIncrement} number={1} />);

    const cloneButton = screen.getByRole('button');
    expect(cloneButton).toBeInTheDocument();
    expect(cloneButton.querySelector('.clone.icon')).toBeInTheDocument();

    fireEvent.mouseEnter(cloneButton);
    expect(screen.getByText(/clone increment/i)).toBeInTheDocument();
    expect(screen.getByText(/"Test Increment"/)).toBeInTheDocument();
  });

  it('dispatches the correct actions when the clone button is clicked', () => {
    renderWithRedux(<ActionsClone increment={mockIncrement} number={1} />);

    const cloneButton = screen.getByRole('button');
    fireEvent.click(cloneButton);

    const actions = store.getState().increments;

    expect(actions.incrementsIsCloning).toBe(true);
    expect(actions.currentIncrement).toEqual({
      ...mockIncrement,
      name: `${mockIncrement.name} (Copy)`,
    });
    expect(actions.incrementsModalOpen).toBe(true);
  });

  it('hides the popup when the mouse leaves the button', () => {
    renderWithRedux(<ActionsClone increment={mockIncrement} number={1} />);

    const cloneButton = screen.getByRole('button');
    fireEvent.mouseEnter(cloneButton);

    expect(screen.getByText(/clone increment/i)).toBeInTheDocument();

    fireEvent.mouseLeave(cloneButton);
    expect(screen.queryByText(/clone increment/i)).not.toBeInTheDocument();
  });

  it('closes the popup when onClose is triggered', () => {
    renderWithRedux(<ActionsClone increment={mockIncrement} number={1} />);

    const cloneButton = screen.getByRole('button');

    fireEvent.mouseEnter(cloneButton);
    expect(screen.getByText(/clone increment/i)).toBeInTheDocument();

    fireEvent.click(document.body);

    expect(screen.queryByText(/clone increment/i)).not.toBeInTheDocument();
  });

  it('truncates the increment name if it exceeds 250 characters', () => {
    const longName = 'A'.repeat(251); // Create a string with 251 characters
    const mockIncrementWithLongName: IIncrement = {
      id: '1',
      name: longName,
      productId: 'product-123',
      start: '2024-08-01T00:00:00Z',
      end: '2024-08-31T23:59:59Z',
      deadline: '2024-08-15T00:00:00Z',
      state: 'active',
    };

    renderWithRedux(
      <ActionsClone increment={mockIncrementWithLongName} number={1} />,
    );

    const cloneButton = screen.getByRole('button');
    fireEvent.click(cloneButton);

    const actions = store.getState().increments;

    // Check that the name has been truncated correctly
    const truncatedName = `...${longName.slice(-240)} (Copy)`; // 240 because the final name length is 250
    expect(actions.currentIncrement?.name).toBe(truncatedName);
    expect(actions.incrementsIsCloning).toBe(true);
    expect(actions.incrementsModalOpen).toBe(true);
  });
});
