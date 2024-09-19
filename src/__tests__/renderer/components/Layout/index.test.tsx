import * as Components from '../../../../renderer/components/Layout';

describe('Layout Components Index', () => {
  it('should export TopBar', () => {
    expect(Components.TopBar).toBeDefined();
  });

  it('should export SideBar', () => {
    expect(Components.SideBar).toBeDefined();
  });

  it('should export Footer', () => {
    expect(Components.Footer).toBeDefined();
  });

  it('should export ToastManager', () => {
    expect(Components.ToastManager).toBeDefined();
  });
});
