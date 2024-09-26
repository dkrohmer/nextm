import { configureStore } from '@reduxjs/toolkit';
import incrementsReducer from '../../../../renderer/store/increments';
import {
  fetchIncrements,
  fetchIncrement,
  addOrUpdateIncrement,
  deleteIncrement,
} from '../../../../renderer/services/api/increments';
import windowElectron from '../../../../../mocks/window-electron';

// Set up a test store with the incrementsReducer slice
const store = configureStore({
  reducer: {
    increments: incrementsReducer,
  },
});

// Tests for thunks
describe('Increments Thunks with Redux Store', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('dispatches fetchIncrements and updates the store on success', async () => {
    const mockIncrements = [{ id: '1', name: 'Increment 1' }];

    window.electron = {
      ...windowElectron,
      getAllIncrements: jest.fn().mockResolvedValue(mockIncrements),
    };

    // Dispatch the fetchIncrements thunk
    await store.dispatch(fetchIncrements({ productId: 'product-123' }));

    const state = store.getState().increments;
    expect(window.electron.getAllIncrements).toHaveBeenCalledWith({
      productId: 'product-123',
      sortby: 'incrementIndex',
      sort: 'desc',
    });
    expect(state.increments).toEqual(mockIncrements);
  });

  it('dispatches fetchIncrement and updates the store on success', async () => {
    const mockIncrement = { id: '1', name: 'Increment 1' };

    window.electron = {
      ...windowElectron,
      getIncrementById: jest.fn().mockResolvedValue(mockIncrement),
    };

    // Dispatch the fetchIncrement thunk
    await store.dispatch(
      fetchIncrement({ incrementId: '1', isEagerLoading: true }),
    );

    // Check if the electron API was called correctly
    expect(window.electron.getIncrementById).toHaveBeenCalledWith({
      incrementId: '1',
      isEagerLoading: true,
    });

    // Check if the store state is updated correctly
    const state = store.getState().increments;
    expect(state.increment).toEqual(mockIncrement);
  });

  it('dispatches addOrUpdateIncrement and updates the store for an update', async () => {
    const mockIncrement = {
      id: '1',
      name: 'Updated Increment',
      productId: '123',
    };

    window.electron = {
      ...windowElectron,
      updateIncrement: jest.fn().mockResolvedValue(mockIncrement),
    };

    // Dispatch the addOrUpdateIncrement thunk
    await store.dispatch(
      addOrUpdateIncrement({ increment: mockIncrement, productId: '123' }),
    );

    const state = store.getState().increments;
    expect(state.increments[0]).toEqual(mockIncrement);
    expect(window.electron.updateIncrement).toHaveBeenCalledWith({
      ...mockIncrement,
      incrementId: '1',
      productId: '123',
    });
  });

  it('dispatches addOrUpdateIncrement and updates the store for a new increment', async () => {
    const newIncrement = { id: '', name: 'New Increment', productId: '123' };
    const mockCreatedIncrement = {
      id: '1',
      name: 'New Increment',
      productId: '123',
    };

    window.electron = {
      ...windowElectron,
      createIncrement: jest.fn().mockResolvedValue(mockCreatedIncrement),
    };

    // Dispatch the addOrUpdateIncrement thunk
    await store.dispatch(
      addOrUpdateIncrement({ increment: newIncrement, productId: '123' }),
    );

    const state = store.getState().increments;
    expect(state.increments[0]).toEqual(mockCreatedIncrement);
    expect(window.electron.createIncrement).toHaveBeenCalledWith({
      ...newIncrement,
      productId: '123',
    });
  });

  it('dispatches deleteIncrement and updates the store on success', async () => {
    window.electron = {
      ...windowElectron,
      deleteIncrement: jest.fn().mockResolvedValue('1'),
    };

    // Dispatch the deleteIncrement thunk
    await store.dispatch(deleteIncrement('1'));

    const state = store.getState().increments;
    expect(state.increments.find((inc) => inc.id === '1')).toBeUndefined();
    expect(window.electron.deleteIncrement).toHaveBeenCalledWith({
      incrementId: '1',
    });
  });

  it('handles fetchIncrements failure correctly', async () => {
    // Mock the electron API to reject the call
    window.electron = {
      ...windowElectron,
      getAllIncrements: jest
        .fn()
        .mockRejectedValue(new Error('Failed to load increments.')),
    };

    // Dispatch the fetchIncrements thunk
    await store.dispatch(fetchIncrements({ productId: 'product-123' }));

    // Check the state for the error
    const state = store.getState().increments;
    expect(state.incrementsError).toBe('Failed to load increments.');
    expect(window.electron.getAllIncrements).toHaveBeenCalledWith({
      productId: 'product-123',
      sortby: 'incrementIndex',
      sort: 'desc',
    });
  });

  it('handles fetchIncrement failure correctly', async () => {
    window.electron.getIncrementById = jest
      .fn()
      .mockRejectedValue(new Error('Failed to load increment.'));

    // Dispatch the fetchIncrement thunk
    await store.dispatch(
      fetchIncrement({ incrementId: '1', isEagerLoading: true }),
    );

    const state = store.getState().increments;
    expect(state.incrementError).toBe('Failed to load increment.');
    expect(window.electron.getIncrementById).toHaveBeenCalledWith({
      incrementId: '1',
      isEagerLoading: true,
    });
  });

  it('handles addOrUpdateIncrement failure correctly', async () => {
    const mockIncrement = { id: '1', name: 'Increment 1', productId: '1' };
    window.electron.updateIncrement = jest
      .fn()
      .mockRejectedValue(new Error('Failed to add or update increment.'));

    // Dispatch the addOrUpdateIncrement thunk
    await store.dispatch(
      addOrUpdateIncrement({
        increment: mockIncrement,
        productId: 'product-123',
      }),
    );

    const state = store.getState().increments;
    expect(state.incrementsError).toBe('Failed to add or update increment.');
  });

  it('handles deleteIncrement failure correctly', async () => {
    window.electron.deleteIncrement = jest
      .fn()
      .mockRejectedValue(new Error('Failed to delete increment.'));

    // Dispatch the deleteIncrement thunk
    await store.dispatch(deleteIncrement('1'));

    const state = store.getState().increments;
    expect(state.incrementsError).toBe('Failed to delete increment.');
  });
});
