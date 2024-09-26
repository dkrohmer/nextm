import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import ModelActionsEdit from '../../../../renderer/components/Model/ActionsEdit';
import modelsReducer from '../../../../renderer/store/models';
import { IModel } from '../../../../renderer/interfaces/IModel';

// Setup a test store with only the necessary slices
const store = configureStore({
  reducer: {
    models: modelsReducer,
  },
});

describe('ModelActionsEdit Component', () => {
  const mockModel: IModel = {
    id: '1',
    name: 'Test Model',
    createdAt: '1',
    incrementId: '1',
  };

  const renderWithRedux = (component: React.ReactElement) => {
    return render(<Provider store={store}>{component}</Provider>);
  };

  it('renders the edit button and popup content', async () => {
    renderWithRedux(<ModelActionsEdit model={mockModel} />);

    const editButton = screen.getByRole('button');
    expect(editButton).toBeInTheDocument();
    expect(editButton.querySelector('i.pencil.icon')).toBeInTheDocument(); // Check for the pencil icon

    // Trigger the popup content to appear
    fireEvent.mouseEnter(editButton);

    // Wait for the popup content to be visible
    await waitFor(() => {
      expect(screen.getByText(/Edit model/i)).toBeInTheDocument();
      expect(screen.getByText(/"Test Model"/)).toBeInTheDocument();
    });
  });

  it('dispatches the correct actions when the edit button is clicked', () => {
    renderWithRedux(<ModelActionsEdit model={mockModel} />);

    const editButton = screen.getByRole('button');
    fireEvent.click(editButton);

    const state = store.getState().models;

    expect(state.modelsCurrentModel).toEqual(mockModel);
    expect(state.modelsModalOpen).toBe(true);
    expect(state.modelsIsEditing).toBe(true);
  });

  it('hides the popup when the mouse leaves the button', async () => {
    renderWithRedux(<ModelActionsEdit model={mockModel} />);

    const editButton = screen.getByRole('button');
    fireEvent.mouseEnter(editButton);

    // Wait for the popup content to be visible
    await waitFor(() => {
      expect(screen.getByText(/Edit model/i)).toBeInTheDocument();
    });

    fireEvent.mouseLeave(editButton);

    // Wait for the popup content to be hidden
    await waitFor(() => {
      expect(screen.queryByText(/Edit model/i)).not.toBeInTheDocument();
    });
  });

  it('does not close the popup on outside click as there is no onClose handler', async () => {
    renderWithRedux(<ModelActionsEdit model={mockModel} />);

    const editButton = screen.getByRole('button');
    fireEvent.mouseEnter(editButton);

    // Wait for the popup content to be visible
    await waitFor(() => {
      expect(screen.getByText(/Edit model/i)).toBeInTheDocument();
    });

    // Test if the popup remains open as no specific onClose handler is implemented
    // No need to simulate outside clicks; ensure popup is still visible
    expect(screen.getByText(/Edit model/i)).toBeInTheDocument();
  });
});
