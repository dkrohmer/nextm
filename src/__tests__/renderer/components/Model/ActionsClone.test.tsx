import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { IModel } from '../../../../renderer/interfaces/IModel';
import ActionsClone from '../../../../renderer/components/Model/ActionsClone';
import modelsReducer from '../../../../renderer/store/models';
import '@testing-library/jest-dom';


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
    incrementId: '1',
  };

  const renderWithRedux = (component: React.ReactElement) => {
    return render(<Provider store={store}>{component}</Provider>);
  };

  it('renders the clone button and popup content', async () => {
    renderWithRedux(<ActionsClone model={mockModel} />);

    const cloneButton = screen.getByRole('button');
    expect(cloneButton).toBeInTheDocument();
    expect(cloneButton.querySelector('.clone.icon')).toBeInTheDocument();

    fireEvent.mouseEnter(cloneButton);

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

    await waitFor(() => {
      expect(screen.getByText(/Clone model/i)).toBeInTheDocument();
    });

    fireEvent.mouseLeave(cloneButton);

    await waitFor(() => {
      expect(screen.queryByText(/Clone model/i)).not.toBeInTheDocument();
    });
  });

  it('closes the popup when onClose is triggered', async () => {
    renderWithRedux(<ActionsClone model={mockModel} />);

    const cloneButton = screen.getByRole('button');
    fireEvent.mouseEnter(cloneButton);

    await waitFor(() => {
      expect(screen.getByText(/Clone model/i)).toBeInTheDocument();
    });
    fireEvent.mouseLeave(cloneButton);
    await waitFor(() => {
      expect(screen.queryByText(/Clone model/i)).not.toBeInTheDocument();
    });
  });

  it('truncates the model name if it exceeds 250 characters', () => {
    const longName = 'A'.repeat(251);
    const mockModelWithLongName: IModel = {
      id: '1',
      name: longName,
      createdAt: '1',
      incrementId: '1',
    };

    renderWithRedux(<ActionsClone model={mockModelWithLongName} />);

    const cloneButton = screen.getByTestId('clone-button');
    fireEvent.click(cloneButton);

    const state = store.getState().models;

    const truncatedName = `...${longName.slice(-240)} (Copy)`;

    expect(state.modelsCurrentModel?.name).toBe(truncatedName);
    expect(state.modelsIsCloning).toBe(true);
    expect(state.modelsModalOpen).toBe(true);
  });
});
