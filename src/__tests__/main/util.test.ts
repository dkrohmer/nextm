import path from 'path';
import { resolveHtmlPath } from '../../main/util';

describe('resolveHtmlPath', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    jest.resetModules(); // Clears the cache
    process.env = { ...originalEnv }; // Make a copy
  });

  afterEach(() => {
    process.env = originalEnv; // Restore the original environment
  });

  it('should return the correct URL in development environment', () => {
    process.env.NODE_ENV = 'development';
    process.env.PORT = '3000';
    const htmlFileName = 'index.html';
    const result = resolveHtmlPath(htmlFileName);
    expect(result).toBe('http://localhost:3000/index.html');
  });

  it('should return the correct URL with default port in development environment', () => {
    process.env.NODE_ENV = 'development';
    delete process.env.PORT; // Remove PORT to test default value
    const htmlFileName = 'index.html';
    const result = resolveHtmlPath(htmlFileName);
    expect(result).toBe('http://localhost:1212/index.html');
  });

  it('should return the correct file path in production environment', () => {
    process.env.NODE_ENV = 'production';
    const htmlFileName = 'index.html';
    const result = resolveHtmlPath(htmlFileName);
    expect(result).toBe(
      `file://${path.resolve(__dirname, '../../renderer/', htmlFileName)}`,
    );
  });
});
