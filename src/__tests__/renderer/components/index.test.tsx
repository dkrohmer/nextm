// index.test.js
import * as index from '../../../renderer/components';

describe('Module Exports', () => {
  it('should export Products', () => {
    expect(index.Products).toBeDefined();
  });

  it('should export Product', () => {
    expect(index.Product).toBeDefined();
  });

  it('should export Increments', () => {
    expect(index.Increments).toBeDefined();
  });

  it('should export Increment', () => {
    expect(index.Increment).toBeDefined();
  });

  it('should export Models', () => {
    expect(index.Models).toBeDefined();
  });

  it('should export Model', () => {
    expect(index.Model).toBeDefined();
  });

  it('should export ModelEditor', () => {
    expect(index.ModelEditor).toBeDefined();
  });

  it('should export Settings', () => {
    expect(index.Settings).toBeDefined();
  });
});
