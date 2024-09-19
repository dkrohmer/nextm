import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import ActionsClone from '../../../../renderer/components/Model/ActionsClone';
import modelsReducer from '../../../../renderer/store/models';
import { IModel } from '../../../../renderer/interfaces/IModel';

// Setup a test store with only the necessary slices
const store = configureStore({
  reducer: {
    models: modelsReducer,
  },
});

describe('ActionsClone Component', () => {
  const mockModel: IModel = {
    id: '1',
    name: 'Test Model',
    createdAt: '1',
    incrementId: '1'
  };

  const renderWithRedux = (component: React.ReactElement) => {
    return render(<Provider store={store}>{component}</Provider>);
  };

  it('renders the clone button and popup content', async () => {
    renderWithRedux(<ActionsClone model={mockModel} />);

    const cloneButton = screen.getByRole('button');
    expect(cloneButton).toBeInTheDocument();
    expect(cloneButton.querySelector('.clone.icon')).toBeInTheDocument(); // Check for the clone icon

    // Trigger the popup content to appear
    fireEvent.mouseEnter(cloneButton);

    // Wait for the popup content to be visible
    await waitFor(() => {
      expect(screen.getByText(/Clone model/i)).toBeInTheDocument();
      expect(screen.getByText(/"Test Model"/)).toBeInTheDocument();
    });
  });

  it('dispatches the correct actions when the clone button is clicked', () => {
    renderWithRedux(<ActionsClone model={mockModel} />);
  
    const cloneButton = screen.getByRole('button');
    fireEvent.click(cloneButton);
  
    const state = store.getState().models;
  
    expect(state.modelsIsCloning).toBe(true);
    expect(state.modelsCurrentModel).toEqual({
      ...mockModel,
      name: `${mockModel.name} (Copy)`,
    });
    expect(state.modelsModalOpen).toBe(true);
  });

  it('hides the popup when the mouse leaves the button', async () => {
    renderWithRedux(<ActionsClone model={mockModel} />);

    const cloneButton = screen.getByRole('button');
    fireEvent.mouseEnter(cloneButton);

    // Wait for the popup content to be visible
    await waitFor(() => {
      expect(screen.getByText(/Clone model/i)).toBeInTheDocument();
    });

    fireEvent.mouseLeave(cloneButton);
    
    // Wait for the popup content to be hidden
    await waitFor(() => {
      expect(screen.queryByText(/Clone model/i)).not.toBeInTheDocument();
    });
  });

  it('closes the popup when onClose is triggered', async () => {
    renderWithRedux(<ActionsClone model={mockModel} />);

    const cloneButton = screen.getByRole('button');
    fireEvent.mouseEnter(cloneButton);

    // Wait for the popup content to be visible
    await waitFor(() => {
      expect(screen.getByText(/Clone model/i)).toBeInTheDocument();
    });
    fireEvent.mouseLeave(cloneButton);
    await waitFor(() => {
      expect(screen.queryByText(/Clone model/i)).not.toBeInTheDocument();
    });
  });
});