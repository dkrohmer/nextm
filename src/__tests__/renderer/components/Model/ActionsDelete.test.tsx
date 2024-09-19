import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import ActionsDelete from '../../../../renderer/components/Model/ActionsDelete';
import modelsReducer from '../../../../renderer/store/models';
import { IModel } from '../../../../renderer/interfaces/IModel';

// Setup a test store with only the necessary slices
const store = configureStore({
  reducer: {
    models: modelsReducer,
  },
});

describe('ActionsDelete Component', () => {
  const mockModel: IModel = {
    id: '1',
    name: 'Test Model',
    createdAt: '1',
    incrementId: '1'
  };

  const renderWithRedux = (component: React.ReactElement) => {
    return render(<Provider store={store}>{component}</Provider>);
  };

  it('renders the delete button and popup content', async () => {
    renderWithRedux(<ActionsDelete model={mockModel} />);

    const deleteButton = screen.getByRole('button');
    expect(deleteButton).toBeInTheDocument();
    expect(deleteButton.querySelector('i.trash.icon')).toBeInTheDocument(); // Check for the trash icon

    // Trigger the popup content to appear
    fireEvent.mouseEnter(deleteButton);

    // Wait for the popup content to be visible
    await waitFor(() => {
      expect(screen.getByText(/Delete model/i)).toBeInTheDocument();
      expect(screen.getByText(/"Test Model"/)).toBeInTheDocument();
    });
  });

  it('dispatches the correct actions when the delete button is clicked', () => {
    renderWithRedux(<ActionsDelete model={mockModel} />);

    const deleteButton = screen.getByRole('button');
    fireEvent.click(deleteButton);

    const state = store.getState().models;

    expect(state.modelToDelete).toBe(mockModel.id);
    expect(state.modelsConfirmOpen).toBe(true);
  });

  it('closes the popup when the mouse leaves the button', async () => {
    renderWithRedux(<ActionsDelete model={mockModel} />);

    const deleteButton = screen.getByRole('button');
    fireEvent.mouseEnter(deleteButton);

    // Wait for the popup content to be visible
    await waitFor(() => {
      expect(screen.getByText(/Delete model/i)).toBeInTheDocument();
    });

    fireEvent.mouseLeave(deleteButton);

    // Wait for the popup content to be hidden
    await waitFor(() => {
      expect(screen.queryByText(/Delete model/i)).not.toBeInTheDocument();
    });
  });
});
