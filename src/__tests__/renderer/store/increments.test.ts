import reducer, {
  setIncrementsActiveIndex,
  setIncrementsActiveIncrementId,
  setIncrementsModalOpen,
  setIncrementsIsEditing,
  setIncrementsIsCloning,
  setCurrentIncrement,
  setIncrementsConfirmOpen,
  setIncrementToDelete,
  initialIncrementsState,
} from '../../../renderer/store/increments';
import type { IIncrement } from '../../../renderer/interfaces/IIncrement';
import { fetchIncrements, fetchIncrement, addOrUpdateIncrement, deleteIncrement } from '../../../renderer/services/api/increments';

describe('Increments Slice', () => {
  let initialState: typeof initialIncrementsState;

  beforeEach(() => {
    initialState = { ...initialIncrementsState };
  });

  it('should handle setIncrementsActiveIndex', () => {
    const action = setIncrementsActiveIndex(1);
    const state = reducer(initialState, action);
    expect(state.incrementsActiveIndex).toEqual(1);
  });

  it('should handle setIncrementsActiveIncrementId', () => {
    const action = setIncrementsActiveIncrementId('123');
    const state = reducer(initialState, action);
    expect(state.incrementsActiveIncrementId).toEqual('123');
  });

  it('should handle setIncrementsModalOpen', () => {
    const action = setIncrementsModalOpen(true);
    const state = reducer(initialState, action);
    expect(state.incrementsModalOpen).toEqual(true);
  });

  it('should handle setIncrementsIsEditing', () => {
    const action = setIncrementsIsEditing(true);
    const state = reducer(initialState, action);
    expect(state.incrementsIsEditing).toEqual(true);
  });

  it('should handle setIncrementsIsCloning', () => {
    const action = setIncrementsIsCloning(true);
    const state = reducer(initialState, action);
    expect(state.incrementsIsCloning).toEqual(true);
  });

  it('should handle setCurrentIncrement', () => {
    const mockIncrement: IIncrement = { id: '1', name: 'Test Increment', productId: '1'  };
    const action = setCurrentIncrement(mockIncrement);
    const state = reducer(initialState, action);
    expect(state.currentIncrement).toEqual(mockIncrement);
  });

  it('should handle setIncrementsConfirmOpen', () => {
    const action = setIncrementsConfirmOpen(true);
    const state = reducer(initialState, action);
    expect(state.incrementsConfirmOpen).toEqual(true);
  });

  it('should handle setIncrementToDelete', () => {
    const action = setIncrementToDelete('123');
    const state = reducer(initialState, action);
    expect(state.incrementToDelete).toEqual('123');
  });

  describe('extraReducers for async actions', () => {
    it('should handle fetchIncrements.pending', () => {
      const action = { type: fetchIncrements.pending.type };
      const state = reducer(initialState, action);
      expect(state.incrementsIsLoading).toBe(true);
      expect(state.incrementsIsLoaded).toBe(false);
    });

    it('should handle fetchIncrements.fulfilled', () => {
      const mockIncrements: IIncrement[] = [{ id: '1', name: 'Increment 1', productId: '1'  }];
      const action = { type: fetchIncrements.fulfilled.type, payload: mockIncrements };
      const state = reducer(initialState, action);
      expect(state.increments).toEqual(mockIncrements);
      expect(state.incrementsIsLoading).toBe(false);
      expect(state.incrementsIsLoaded).toBe(true);
    });

    it('should handle fetchIncrements.rejected', () => {
      const action = { type: fetchIncrements.rejected.type, payload: 'Error fetching increments' };
      const state = reducer(initialState, action);
      expect(state.incrementsIsLoading).toBe(false);
      expect(state.incrementsIsLoaded).toBe(false);
      expect(state.incrementsError).toEqual('Error fetching increments');
    });

    it('should handle fetchIncrement.pending', () => {
      const action = { type: fetchIncrement.pending.type };
      const state = reducer(initialState, action);
      expect(state.incrementIsLoading).toBe(true);
      expect(state.incrementError).toBeNull();
      expect(state.incrementIsLoaded).toBe(false);
    });

    it('should handle fetchIncrement.fulfilled', () => {
      const mockIncrement: IIncrement = { id: '1', name: 'Increment 1', productId: '1'  };
      const action = { type: fetchIncrement.fulfilled.type, payload: mockIncrement };
      const state = reducer(initialState, action);
      expect(state.increment).toEqual(mockIncrement);
      expect(state.incrementIsLoading).toBe(false);
      expect(state.incrementIsLoaded).toBe(true);
    });

    it('should handle fetchIncrement.rejected', () => {
      const action = { type: fetchIncrement.rejected.type, payload: 'Error fetching increment' };
      const state = reducer(initialState, action);
      expect(state.incrementIsLoading).toBe(false);
      expect(state.incrementIsLoaded).toBe(false);
      expect(state.incrementError).toEqual('Error fetching increment');
    });

    it('should handle addOrUpdateIncrement.fulfilled', () => {
      const mockIncrement: IIncrement = { id: '1', name: 'Updated Increment', productId: '1'  };
      initialState.increments = [{ id: '1', name: 'Increment 1', productId: '1'  }];
      const action = { type: addOrUpdateIncrement.fulfilled.type, payload: mockIncrement };
      const state = reducer(initialState, action);
      expect(state.increments[0]).toEqual(mockIncrement);
      expect(state.incrementsModalOpen).toBe(false);
    });

    it('should handle addOrUpdateIncrement.fulfilled and unshift new increment when not found in increments array', () => {
      const mockIncrement: IIncrement = { id: '2', name: 'New Increment', productId: '1' };
  
      // Simulate that there is already one increment with id '1' in the state, including additional properties like productId
      initialState.increments = [{ id: '1', name: 'Increment 1', productId: '1' }];
  
      const action = {
        type: addOrUpdateIncrement.fulfilled.type,
        payload: mockIncrement,
      };
  
      const state = reducer(initialState, action);
  
      // Expect the new increment to be added at the beginning of the array
      expect(state.increments[0]).toEqual(mockIncrement);
  
      // Use partial match (toMatchObject) for the second increment to ignore unexpected properties
      expect(state.increments[1]).toMatchObject({ id: '1', name: 'Increment 1' });
  
      // Ensure the modal is closed after the operation
      expect(state.incrementsModalOpen).toBe(false);
    });

    it('should handle addOrUpdateIncrement.rejected', () => {
      const action = { type: addOrUpdateIncrement.rejected.type, payload: 'Error updating increment' };
      const state = reducer(initialState, action);
      expect(state.incrementsError).toEqual('Error updating increment');
    });

    it('should handle deleteIncrement.fulfilled', () => {
      initialState.increments = [{ id: '1', name: 'Increment 1', productId: '1' }];
      const action = { type: deleteIncrement.fulfilled.type, payload: '1' };
      const state = reducer(initialState, action);
      expect(state.increments).toEqual([]);
      expect(state.incrementsConfirmOpen).toBe(false);
    });

    it('should handle deleteIncrement.rejected', () => {
      const action = { type: deleteIncrement.rejected.type, payload: 'Error deleting increment' };
      const state = reducer(initialState, action);
      expect(state.incrementsError).toEqual('Error deleting increment');
      expect(state.incrementsConfirmOpen).toBe(false);
    });
  });
});
