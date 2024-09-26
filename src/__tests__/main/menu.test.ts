import { app, Menu, shell, BrowserWindow } from 'electron';
import MenuBuilder from '../../main/menu';

jest.mock('electron', () => {
  const originalModule = jest.requireActual('electron');
  const mockMenu = {
    popup: jest.fn(),
  };

  return {
    ...originalModule,
    app: {
      isPackaged: false,
      getPath: jest.fn().mockReturnValue('mockedPath'),
      on: jest.fn(),
      quit: jest.fn(),
    },
    BrowserWindow: jest.fn().mockImplementation(() => ({
      loadURL: jest.fn(),
      webContents: {
        openDevTools: jest.fn(),
        setWindowOpenHandler: jest.fn(),
        on: jest.fn(),
        inspectElement: jest.fn(),
        toggleDevTools: jest.fn(),
        reload: jest.fn(),
      },
      on: jest.fn(),
      setFullScreen: jest.fn(),
      isFullScreen: jest.fn().mockReturnValue(false),
      close: jest.fn(),
    })),
    Menu: {
      buildFromTemplate: jest.fn().mockReturnValue(mockMenu),
      setApplicationMenu: jest.fn(),
    },
    shell: {
      openExternal: jest.fn(),
    },
  };
});

describe('MenuBuilder', () => {
  let menuBuilder: MenuBuilder;
  let mainWindow: BrowserWindow;
  let originalPlatform: NodeJS.Platform;

  beforeEach(() => {
    jest.clearAllMocks();
    mainWindow = new BrowserWindow() as unknown as BrowserWindow;
    menuBuilder = new MenuBuilder(mainWindow);
    originalPlatform = process.platform;
  });

  afterEach(() => {
    Object.defineProperty(process, 'platform', {
      value: originalPlatform,
    });
  });

  it('should build menu and set application menu', () => {
    const menu = menuBuilder.buildMenu();

    expect(Menu.buildFromTemplate).toHaveBeenCalled();
    expect(Menu.setApplicationMenu).toHaveBeenCalledWith(menu);
  });

  it('should set up development environment', () => {
    menuBuilder.setupDevelopmentEnvironment();

    expect(mainWindow.webContents.on).toHaveBeenCalledWith(
      'context-menu',
      expect.any(Function),
    );
  });

  it('should handle context-menu event in development environment', () => {
    menuBuilder.setupDevelopmentEnvironment();

    const contextMenuCallback = (
      mainWindow.webContents.on as jest.Mock
    ).mock.calls.find((call) => call[0] === 'context-menu')[1];

    const eventProps = { x: 100, y: 200 };
    contextMenuCallback({}, eventProps);

    expect(Menu.buildFromTemplate).toHaveBeenCalledWith([
      {
        label: 'Inspect element',
        click: expect.any(Function),
      },
    ]);

    const mockMenu = (Menu.buildFromTemplate as jest.Mock).mock.results[0]
      .value;
    expect(mockMenu.popup).toHaveBeenCalledWith({ window: mainWindow });

    const inspectElementItem = (Menu.buildFromTemplate as jest.Mock).mock
      .calls[0][0][0];
    inspectElementItem.click();
    expect(mainWindow.webContents.inspectElement).toHaveBeenCalledWith(
      eventProps.x,
      eventProps.y,
    );
  });

  it('should build Darwin template', () => {
    const template = menuBuilder.buildDarwinTemplate();

    expect(template).toEqual(expect.any(Array));
    expect(template[0].label).toBe('Electron');
    expect(template[1].label).toBe('Edit');
    expect(template[2].label).toBe('View');
    expect(template[3].label).toBe('Window');
    expect(template[4].label).toBe('Help');
  });

  it('should handle "Quit" click in Darwin template', () => {
    const template = menuBuilder.buildDarwinTemplate();
    const quitItem = (template[0].submenu as any[]).find(
      (item) => item.label === 'Quit',
    );

    quitItem.click();
    expect(app.quit).toHaveBeenCalled();
  });

  it('should handle "Reload" click in Darwin template', () => {
    process.env.NODE_ENV = 'development';
    const template = menuBuilder.buildDarwinTemplate();
    const viewSubmenu = template[2].submenu as any[];

    const reloadItem = viewSubmenu.find((item) => item.label === 'Reload');
    reloadItem.click();

    expect(mainWindow.webContents.reload).toHaveBeenCalled();
  });

  it('should handle "Toggle Full Screen" click in Darwin template when in full screen in development', () => {
    process.env.NODE_ENV = 'development';
    const template = menuBuilder.buildDarwinTemplate();
    const viewSubmenu = template[2].submenu as any[];

    const toggleFullScreenItem = viewSubmenu.find(
      (item) => item.label === 'Toggle Full Screen',
    );

    (mainWindow.isFullScreen as jest.Mock).mockReturnValue(true);
    toggleFullScreenItem.click();
    expect(mainWindow.setFullScreen).toHaveBeenCalledWith(false);
  });

  it('should handle "Toggle Full Screen" click in Darwin template when in full screen in production', () => {
    process.env.NODE_ENV = 'production';
    const template = menuBuilder.buildDarwinTemplate();
    const viewSubmenu = template[2].submenu as any[];

    const toggleFullScreenItem = viewSubmenu.find(
      (item) => item.label === 'Toggle Full Screen',
    );

    (mainWindow.isFullScreen as jest.Mock).mockReturnValue(true);
    toggleFullScreenItem.click();
    expect(mainWindow.setFullScreen).toHaveBeenCalledWith(false);
  });

  it('should handle "Toggle Developer Tools" click in Darwin template in development', () => {
    process.env.NODE_ENV = 'development';
    const template = menuBuilder.buildDarwinTemplate();
    const viewSubmenu = template[2].submenu as any[];

    const toggleDevToolsItem = viewSubmenu.find(
      (item) => item.label === 'Toggle Developer Tools',
    );
    toggleDevToolsItem.click();

    expect(mainWindow.webContents.toggleDevTools).toHaveBeenCalled();
  });

  it('should handle "Close" click in default template', () => {
    const template = menuBuilder.buildDefaultTemplate();
    const fileSubmenu = template[0].submenu as any[];

    const closeItem = fileSubmenu.find((item) => item.label === '&Close');
    closeItem.click();

    expect(mainWindow.close).toHaveBeenCalled();
  });

  it('should build default template', () => {
    const template = menuBuilder.buildDefaultTemplate();

    expect(template).toEqual(expect.any(Array));
    expect(template[0].label).toBe('&File');
    expect(template[1].label).toBe('&View');
    expect(template[2].label).toBe('Help');
  });

  it('should handle "Toggle Developer Tools" click', () => {
    process.env.NODE_ENV = 'development';
    const template = menuBuilder.buildDefaultTemplate();
    const viewSubmenu = template[1].submenu as any[];

    const toggleDevToolsItem = viewSubmenu.find(
      (item) => item.label === 'Toggle &Developer Tools',
    );

    toggleDevToolsItem.click();

    expect(mainWindow.webContents.toggleDevTools).toHaveBeenCalled();
  });

  it('should handle "Toggle Full Screen" click in development environment', () => {
    process.env.NODE_ENV = 'development';
    const template = menuBuilder.buildDefaultTemplate();
    const viewSubmenu = template[1].submenu as any[];

    const toggleFullScreenItem = viewSubmenu.find(
      (item) => item.label === 'Toggle &Full Screen',
    );

    toggleFullScreenItem.click();

    expect(mainWindow.setFullScreen).toHaveBeenCalledWith(true);
  });

  it('should handle "Toggle Full Screen" click in production environment when in full screen', () => {
    process.env.NODE_ENV = 'production';
    const template = menuBuilder.buildDefaultTemplate();
    const viewSubmenu = template[1].submenu as any[];

    const toggleFullScreenItem = viewSubmenu.find(
      (item) => item.label === 'Toggle &Full Screen',
    );

    (mainWindow.isFullScreen as jest.Mock).mockReturnValue(true);
    toggleFullScreenItem.click();
    expect(mainWindow.setFullScreen).toHaveBeenCalledWith(false);
  });

  it('should handle "Toggle Full Screen" click in subMenuViewProd', () => {
    process.env.NODE_ENV = 'production';
    const template = menuBuilder.buildDefaultTemplate();
    const viewSubmenu = template[1].submenu as any[];

    const toggleFullScreenItem = viewSubmenu.find(
      (item) => item.label === 'Toggle &Full Screen',
    );

    expect(toggleFullScreenItem).toBeDefined();

    (mainWindow.isFullScreen as jest.Mock).mockReturnValue(false);
    toggleFullScreenItem.click();
    expect(mainWindow.setFullScreen).toHaveBeenCalledWith(true);

    (mainWindow.isFullScreen as jest.Mock).mockReturnValue(true);
    toggleFullScreenItem.click();
    expect(mainWindow.setFullScreen).toHaveBeenCalledWith(false);
  });

  it('should handle "Reload" click in default template', () => {
    process.env.NODE_ENV = 'development';
    const template = menuBuilder.buildDefaultTemplate();
    const viewSubmenu = template[1].submenu as any[];

    const reloadItem = viewSubmenu.find((item) => item.label === '&Reload');
    reloadItem.click();

    expect(mainWindow.webContents.reload).toHaveBeenCalled();
  });

  it('should handle "Learn More" click in Help menu in Darwin template', () => {
    const template = menuBuilder.buildDarwinTemplate();
    const helpSubmenu = template[4].submenu as any[];

    const learnMoreItem = helpSubmenu.find(
      (item) => item.label === 'Learn More',
    );
    learnMoreItem.click();

    expect(shell.openExternal).toHaveBeenCalledWith('https://electronjs.org');
  });

  it('should handle "Documentation" click in Help menu in Darwin template', () => {
    const template = menuBuilder.buildDarwinTemplate();
    const helpSubmenu = template[4].submenu as any[];

    const documentationItem = helpSubmenu.find(
      (item) => item.label === 'Documentation',
    );
    documentationItem.click();

    expect(shell.openExternal).toHaveBeenCalledWith(
      'https://github.com/electron/electron/tree/main/docs#readme',
    );
  });

  it('should handle "Community Discussions" click in Help menu in Darwin template', () => {
    const template = menuBuilder.buildDarwinTemplate();
    const helpSubmenu = template[4].submenu as any[];

    const communityDiscussionsItem = helpSubmenu.find(
      (item) => item.label === 'Community Discussions',
    );
    communityDiscussionsItem.click();

    expect(shell.openExternal).toHaveBeenCalledWith(
      'https://www.electronjs.org/community',
    );
  });

  it('should handle "Search Issues" click in Help menu in Darwin template', () => {
    const template = menuBuilder.buildDarwinTemplate();
    const helpSubmenu = template[4].submenu as any[];

    const searchIssuesItem = helpSubmenu.find(
      (item) => item.label === 'Search Issues',
    );
    searchIssuesItem.click();

    expect(shell.openExternal).toHaveBeenCalledWith(
      'https://github.com/electron/electron/issues',
    );
  });

  it('should handle "Learn More" click in Help menu in default template', () => {
    const template = menuBuilder.buildDefaultTemplate();
    const helpSubmenu = template[2].submenu as any[];

    const learnMoreItem = helpSubmenu.find(
      (item) => item.label === 'Learn More',
    );
    learnMoreItem.click();

    expect(shell.openExternal).toHaveBeenCalledWith('https://electronjs.org');
  });

  it('should handle "Documentation" click in Help menu in default template', () => {
    const template = menuBuilder.buildDefaultTemplate();
    const helpSubmenu = template[2].submenu as any[];

    const documentationItem = helpSubmenu.find(
      (item) => item.label === 'Documentation',
    );
    documentationItem.click();

    expect(shell.openExternal).toHaveBeenCalledWith(
      'https://github.com/electron/electron/tree/main/docs#readme',
    );
  });

  it('should handle "Community Discussions" click in Help menu in default template', () => {
    const template = menuBuilder.buildDefaultTemplate();
    const helpSubmenu = template[2].submenu as any[];

    const communityDiscussionsItem = helpSubmenu.find(
      (item) => item.label === 'Community Discussions',
    );
    communityDiscussionsItem.click();

    expect(shell.openExternal).toHaveBeenCalledWith(
      'https://www.electronjs.org/community',
    );
  });

  it('should handle "Search Issues" click in Help menu in default template', () => {
    const template = menuBuilder.buildDefaultTemplate();
    const helpSubmenu = template[2].submenu as any[];

    const searchIssuesItem = helpSubmenu.find(
      (item) => item.label === 'Search Issues',
    );
    searchIssuesItem.click();

    expect(shell.openExternal).toHaveBeenCalledWith(
      'https://github.com/electron/electron/issues',
    );
  });

  it('should setup development environment when NODE_ENV is development', () => {
    process.env.NODE_ENV = 'development';
    menuBuilder.buildMenu();

    expect(mainWindow.webContents.on).toHaveBeenCalledWith(
      'context-menu',
      expect.any(Function),
    );
  });

  it('should setup development environment when DEBUG_PROD is true', () => {
    process.env.DEBUG_PROD = 'true';
    menuBuilder.buildMenu();

    expect(mainWindow.webContents.on).toHaveBeenCalledWith(
      'context-menu',
      expect.any(Function),
    );
  });

  it('should handle "Toggle Full Screen" click in production environment when not in full screen', () => {
    process.env.NODE_ENV = 'production';
    const template = menuBuilder.buildDefaultTemplate();
    const viewSubmenu = template[1].submenu as any[];

    const toggleFullScreenItem = viewSubmenu.find(
      (item) => item.label === 'Toggle &Full Screen',
    );

    (mainWindow.isFullScreen as jest.Mock).mockReturnValue(false);
    toggleFullScreenItem.click();
    expect(mainWindow.setFullScreen).toHaveBeenCalledWith(true);
  });

  it('should handle "Toggle Full Screen" click in subMenuViewProd', () => {
    process.env.NODE_ENV = 'production';
    const template = menuBuilder.buildDefaultTemplate();
    const viewSubmenu = template[1].submenu as any[];

    const toggleFullScreenItem = viewSubmenu.find(
      (item) => item.label === 'Toggle &Full Screen',
    );

    expect(toggleFullScreenItem).toBeDefined();

    (mainWindow.isFullScreen as jest.Mock).mockReturnValue(false);
    toggleFullScreenItem.click();
    expect(mainWindow.setFullScreen).toHaveBeenCalledWith(true);

    (mainWindow.isFullScreen as jest.Mock).mockReturnValue(true);
    toggleFullScreenItem.click();
    expect(mainWindow.setFullScreen).toHaveBeenCalledWith(false);
  });

  it('should handle "Toggle Full Screen" click in subMenuViewDev', () => {
    process.env.NODE_ENV = 'development';
    const template = menuBuilder.buildDefaultTemplate();
    const viewSubmenu = template[1].submenu as any[];

    const toggleFullScreenItem = viewSubmenu.find(
      (item) => item.label === 'Toggle &Full Screen',
    );

    expect(toggleFullScreenItem).toBeDefined();

    (mainWindow.isFullScreen as jest.Mock).mockReturnValue(false);
    toggleFullScreenItem.click();
    expect(mainWindow.setFullScreen).toHaveBeenCalledWith(true);

    (mainWindow.isFullScreen as jest.Mock).mockReturnValue(true);
    toggleFullScreenItem.click();
    expect(mainWindow.setFullScreen).toHaveBeenCalledWith(false);
  });

  it('should build menu and set application menu for darwin platform', () => {
    Object.defineProperty(process, 'platform', {
      value: 'darwin',
    });

    process.env.NODE_ENV = 'production';

    const menu = menuBuilder.buildMenu();

    menuBuilder.buildDarwinTemplate();
    expect(Menu.buildFromTemplate).toHaveBeenCalled();
    expect(Menu.setApplicationMenu).toHaveBeenCalledWith(menu);
  });

  it('should build menu and set application menu for non-darwin platform', () => {
    Object.defineProperty(process, 'platform', {
      value: 'win32',
    });

    process.env.NODE_ENV = 'development';

    const menu = menuBuilder.buildMenu();

    menuBuilder.buildDefaultTemplate();
    expect(Menu.buildFromTemplate).toHaveBeenCalled();
    expect(Menu.setApplicationMenu).toHaveBeenCalledWith(menu);
  });
});
