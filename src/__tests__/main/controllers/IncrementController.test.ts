import { ipcMain, ipcRenderer } from 'electron';
import { IncrementService } from '../../../main/services/IncrementService';
import { IncrementController } from '../../../main/controllers/IncrementController';
import { Increment } from '../../../main/models/Increment';

jest.mock('../../../main/services/IncrementService');

describe('IncrementController', () => {
  let incrementController: IncrementController;
  let incrementService: jest.Mocked<IncrementService>;

  beforeEach(() => {
    incrementController = new IncrementController();
    incrementService = new IncrementService() as jest.Mocked<IncrementService>;
    incrementController['incrementService'] = incrementService;
  });

  afterEach(() => {
    jest.clearAllMocks();
    incrementController.destroy();
    ipcMain.removeHandler('create-increment');
    ipcMain.removeHandler('get-all-increments');
    ipcMain.removeHandler('get-increment-by-id');
    ipcMain.removeHandler('get-latest-increment');
    ipcMain.removeHandler('update-increment');
    ipcMain.removeHandler('delete-increment');
  });

  it('should handle create-increment correctly', async () => {
    const mockIncrement = new Increment();
    mockIncrement.id = '123';
    mockIncrement.createdAt = new Date();
    mockIncrement.name = 'test-increment';
    mockIncrement.toJSON = jest.fn().mockReturnValue({
      ...mockIncrement,
      createdAt: mockIncrement.createdAt.toISOString(),
    });

    incrementService.createIncrement.mockResolvedValue(mockIncrement);

    const response = await ipcRenderer.invoke('create-increment', {
      productId: 'test-product',
      name: 'test-increment',
    });

    expect(response).toEqual(mockIncrement);
    expect(incrementService.createIncrement).toHaveBeenCalledWith({
      productId: 'test-product',
      name: 'test-increment',
    });
  });

  it('should handle create-increment error', async () => {
    const error = new Error('Product not found');
    incrementService.createIncrement.mockRejectedValue(error);

    const response = await ipcRenderer.invoke('create-increment', {
      productId: null,
      name: 'test-increment',
    });

    expect(response).toBeUndefined();
    // expect(console.error).toHaveBeenCalledWith(error); // Uncomment if you want to check console.error call
  });

  it('should handle get-all-increments correctly', async () => {
    const mockIncrement = new Increment();
    mockIncrement.id = '123';
    mockIncrement.createdAt = new Date();
    mockIncrement.name = 'test-increment';
    mockIncrement.toJSON = jest.fn().mockReturnValue({
      ...mockIncrement,
      createdAt: mockIncrement.createdAt.toISOString(),
    });

    incrementService.getAllIncrements.mockResolvedValue({
      increments: [mockIncrement],
      incrementsCount: 1,
    });

    const response = await ipcRenderer.invoke('get-all-increments', {
      sort: 'asc',
      sortby: 'createdAt',
      productId: 'test-product',
    });

    expect(response).toEqual({ increments: [mockIncrement], incrementsCount: 1 });
    expect(incrementService.getAllIncrements).toHaveBeenCalledWith(
      'createdAt',
      'asc',
      'test-product'
    );
  });

  it('should handle get-all-increments with invalid sort direction', async () => {
    const mockIncrement = new Increment();
    mockIncrement.id = '123';
    mockIncrement.createdAt = new Date();
    mockIncrement.name = 'test-increment';
    mockIncrement.toJSON = jest.fn().mockReturnValue({
      ...mockIncrement,
      createdAt: mockIncrement.createdAt.toISOString(),
    });

    incrementService.getAllIncrements.mockResolvedValue({
      increments: [mockIncrement],
      incrementsCount: 1,
    });

    const response = await ipcRenderer.invoke('get-all-increments', {
      sort: 'invalid',
      sortby: 'createdAt',
      productId: 'test-product',
    });

    expect(response).toEqual({ increments: [mockIncrement], incrementsCount: 1 });
    expect(incrementService.getAllIncrements).toHaveBeenCalledWith(
      'createdAt',
      'desc',
      'test-product'
    );
  });

  it('should handle get-all-increments with invalid sortby', async () => {
    const mockIncrement = new Increment();
    mockIncrement.id = '123';
    mockIncrement.createdAt = new Date();
    mockIncrement.name = 'test-increment';
    mockIncrement.toJSON = jest.fn().mockReturnValue({
      ...mockIncrement,
      createdAt: mockIncrement.createdAt.toISOString(),
    });

    incrementService.getAllIncrements.mockResolvedValue({
      increments: [mockIncrement],
      incrementsCount: 1,
    });

    const response = await ipcRenderer.invoke('get-all-increments', {
      sort: 'asc',
      sortby: 'invalid-field',
      productId: 'test-product',
    });

    expect(response).toEqual({ increments: [mockIncrement], incrementsCount: 1 });
    expect(incrementService.getAllIncrements).toHaveBeenCalledWith(
      'createdAt',
      'asc',
      'test-product'
    );
  });

  it('should handle get-all-increments with missing sortby', async () => {
    const mockIncrement = new Increment();
    mockIncrement.id = '123';
    mockIncrement.createdAt = new Date();
    mockIncrement.name = 'test-increment';
    mockIncrement.toJSON = jest.fn().mockReturnValue({
      ...mockIncrement,
      createdAt: mockIncrement.createdAt.toISOString(),
    });

    incrementService.getAllIncrements.mockResolvedValue({
      increments: [mockIncrement],
      incrementsCount: 1,
    });

    const response = await ipcRenderer.invoke('get-all-increments', {
      sort: 'asc',
      productId: 'test-product',
    });

    expect(response).toEqual({ increments: [mockIncrement], incrementsCount: 1 });
    expect(incrementService.getAllIncrements).toHaveBeenCalledWith(
      'createdAt',
      'asc',
      'test-product'
    );
  });

  it('should handle get-all-increments error', async () => {
    const error = new Error('Fetch error');
    incrementService.getAllIncrements.mockRejectedValue(error);

    const response = await ipcRenderer.invoke('get-all-increments', {
      sort: 'asc',
      sortby: 'createdAt',
      productId: 'test-product',
    });

    expect(response).toBeUndefined();
    // expect(console.error).toHaveBeenCalledWith(error); // Uncomment if you want to check console.error call
  });

  it('should handle get-all-increments with default sortby', async () => {
    const mockIncrement = new Increment();
    mockIncrement.id = '123';
    mockIncrement.createdAt = new Date();
    mockIncrement.name = 'test-increment';
    mockIncrement.toJSON = jest.fn().mockReturnValue({
      ...mockIncrement,
      createdAt: mockIncrement.createdAt.toISOString(),
    });

    incrementService.getAllIncrements.mockResolvedValue({
      increments: [mockIncrement],
      incrementsCount: 1,
    });

    const response = await ipcRenderer.invoke('get-all-increments', {
      sort: 'asc',
      productId: 'test-product',
    });

    expect(response).toEqual({ increments: [mockIncrement], incrementsCount: 1 });
    expect(incrementService.getAllIncrements).toHaveBeenCalledWith(
      'createdAt',
      'asc',
      'test-product'
    );
  });

  it('should handle get-increment-by-id correctly', async () => {
    const mockIncrement = new Increment();
    mockIncrement.id = '123';
    mockIncrement.createdAt = new Date();
    mockIncrement.name = 'test-increment';
    mockIncrement.toJSON = jest.fn().mockReturnValue({
      ...mockIncrement,
      createdAt: mockIncrement.createdAt.toISOString(),
    });

    incrementService.getIncrementById.mockResolvedValue(mockIncrement);

    const response = await ipcRenderer.invoke('get-increment-by-id', {
      incrementId: '123',
      isEagerLoading: true,
    });

    expect(response).toEqual(mockIncrement);
    expect(incrementService.getIncrementById).toHaveBeenCalledWith('123', true);
  });

  it('should handle get-increment-by-id error', async () => {
    const error = new Error('Fetch error');
    incrementService.getIncrementById.mockRejectedValue(error);

    const response = await ipcRenderer.invoke('get-increment-by-id', {
      incrementId: '123',
      isEagerLoading: true,
    });

    expect(response).toBeUndefined();
    // expect(console.error).toHaveBeenCalledWith(error); // Uncomment if you want to check console.error call
  });

  it('should handle get-increment-by-id nulled', async () => {
    const error = new Error('Failed to get increment');
    incrementService.getIncrementById.mockResolvedValue(null);

    const response = await ipcRenderer.invoke('get-increment-by-id', {
      incrementId: '123',
      isEagerLoading: true,
    });

    expect(response).toBeUndefined();
    // expect(console.error).toHaveBeenCalledWith(error); // Uncomment if you want to check console.error call
  });

  it('should handle get-latest-increment correctly', async () => {
    const mockIncrement = new Increment();
    mockIncrement.id = '123';
    mockIncrement.createdAt = new Date();
    mockIncrement.name = 'test-increment';
    mockIncrement.toJSON = jest.fn().mockReturnValue({
      ...mockIncrement,
      createdAt: mockIncrement.createdAt.toISOString(),
    });

    incrementService.getLatestIncrement.mockResolvedValue(mockIncrement);

    const response = await ipcRenderer.invoke('get-latest-increment', {
      productId: 'test-product',
    });

    expect(response).toEqual(mockIncrement);
    expect(incrementService.getLatestIncrement).toHaveBeenCalledWith('test-product');
  });

  it('should handle get-latest-increment error', async () => {
    const error = new Error('Fetch error');
    incrementService.getLatestIncrement.mockRejectedValue(error);

    const response = await ipcRenderer.invoke('get-latest-increment', {
      productId: 'test-product',
    });

    expect(response).toBeUndefined();
    // expect(console.error).toHaveBeenCalledWith(error); // Uncomment if you want to check console.error call
  });

  it('should handle get-latest-increment nulled', async () => {
    const error = new Error('Failed to get latest increment.');
    incrementService.getLatestIncrement.mockResolvedValue(null);

    const response = await ipcRenderer.invoke('get-latest-increment', {
      productId: 'test-product',
    });

    expect(response).toBeUndefined();
    // expect(console.error).toHaveBeenCalledWith(error); // Uncomment if you want to check console.error call
  });

  it('should handle update-increment correctly', async () => {
    const mockIncrement = new Increment();
    mockIncrement.id = '123';
    mockIncrement.createdAt = new Date();
    mockIncrement.name = 'updated-increment';
    mockIncrement.toJSON = jest.fn().mockReturnValue({
      ...mockIncrement,
      createdAt: mockIncrement.createdAt.toISOString(),
    });

    incrementService.updateIncrement.mockResolvedValue(mockIncrement);

    const response = await ipcRenderer.invoke('update-increment', {
      incrementId: '123',
      name: 'updated-increment',
    });

    expect(response).toEqual(mockIncrement);
    expect(incrementService.updateIncrement).toHaveBeenCalledWith('123', {
      name: 'updated-increment',
    });
  });

  it('should handle update-increment error', async () => {
    const error = new Error('Update error');
    incrementService.updateIncrement.mockRejectedValue(error);

    const response = await ipcRenderer.invoke('update-increment', {
      incrementId: '123',
      name: 'updated-increment',
    });

    expect(response).toBeUndefined();
    // expect(console.error).toHaveBeenCalledWith(error); // Uncomment if you want to check console.error call
  });

  it('should handle update-increment nulled', async () => {
    const error = new Error('Failed to update increment');
    incrementService.updateIncrement.mockResolvedValue(null);

    const response = await ipcRenderer.invoke('update-increment', {
      incrementId: '123',
      name: 'updated-increment',
    });

    expect(response).toBeUndefined();
    // expect(console.error).toHaveBeenCalledWith(error); // Uncomment if you want to check console.error call
  });

  it('should handle delete-increment correctly', async () => {
    const response = await ipcRenderer.invoke('delete-increment', {
      incrementId: '123',
    });

    expect(response).toBeUndefined();
    expect(incrementService.deleteIncrement).toHaveBeenCalledWith('123');
  });

  it('should handle delete-increment error', async () => {
    const error = new Error('Delete error');
    incrementService.deleteIncrement.mockRejectedValue(error);

    const response = await ipcRenderer.invoke('delete-increment', {
      incrementId: '123',
    });

    expect(response).toBeUndefined();
    // expect(console.error).toHaveBeenCalledWith(error); // Uncomment if you want to check console.error call
  });
});
