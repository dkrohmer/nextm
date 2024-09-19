import { compareGraphHashes } from '../../../renderer/utils/compareGraphHashes'; // Adjust the path if necessary
import crypto from 'crypto-js';

jest.mock('crypto-js', () => ({
  SHA256: jest.fn((input: string) => ({
    toString: () => `hash_${input}`,
  })),
}));

describe('compareGraphHashes', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return true when the hashes of oldGraph and newGraph are the same', () => {
    const oldGraph = { nodes: [{ id: 1, label: 'Node 1' }] };
    const newGraph = { nodes: [{ id: 1, label: 'Node 1' }] };

    const result = compareGraphHashes(oldGraph, newGraph);

    // Check that computeHash was called with both graphs
    expect(crypto.SHA256).toHaveBeenCalledWith(JSON.stringify(oldGraph));
    expect(crypto.SHA256).toHaveBeenCalledWith(JSON.stringify(newGraph));

    // Since we're mocking the hash function to return `hash_${input}`, the hashes will match
    expect(result).toBe(true);
  });

  it('should return false when the hashes of oldGraph and newGraph are different', () => {
    const oldGraph = { nodes: [{ id: 1, label: 'Node 1' }] };
    const newGraph = { nodes: [{ id: 2, label: 'Node 2' }] };

    const result = compareGraphHashes(oldGraph, newGraph);

    // Check that computeHash was called with both graphs
    expect(crypto.SHA256).toHaveBeenCalledWith(JSON.stringify(oldGraph));
    expect(crypto.SHA256).toHaveBeenCalledWith(JSON.stringify(newGraph));

    // Since the mock will return different hashes for different inputs, the result should be false
    expect(result).toBe(false);
  });

  it('should handle empty graphs and return true if both are empty', () => {
    const oldGraph = {};
    const newGraph = {};

    const result = compareGraphHashes(oldGraph, newGraph);

    expect(crypto.SHA256).toHaveBeenCalledWith(JSON.stringify(oldGraph));
    expect(crypto.SHA256).toHaveBeenCalledWith(JSON.stringify(newGraph));
    expect(result).toBe(true);
  });
});
