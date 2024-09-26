/* eslint global-require: off, no-console: off, promise/always-return: off */

/**
 * This module executes inside of electron's main process. You can start
 * electron renderer process from here and communicate with the other processes
 * through IPC.
 *
 * When running `npm run build` or `npm run build:main`, this file is compiled to
 * `./src/main.js` using webpack. This gives us some performance wins.
 */

import { resolveHtmlPath } from './util';
import { initializeDataSource } from './database';
import { IncrementController } from './controllers/IncrementController';
import { ModelController } from './controllers/ModelController';
import { ProductController } from './controllers/ProductController';
import { VersionController } from './controllers/VersionController';
import { 
  app, 
  BrowserWindow, 
  shell, 
  ipcMain, 
  screen, 
  dialog 
} from 'electron';
import fs from 'fs';
import path from 'path';
import MenuBuilder from './menu';

let isQuitting: boolean = false;

let productController: ProductController;
let incrementController: IncrementController;
let modelController: ModelController;
let versionController: VersionController;

const configPath: string =
  process.env.NODE_ENV === 'development'
    ? 'nextm.conf'
    : path.resolve(app.getPath('userData'), 'nextm.conf');

const getDefaultDbPath = () => {
  const dbPath =
    process.env.NODE_ENV === 'development'
      ? 'nextm.db'
      : path.resolve(app.getPath('userData'), 'nextm.db');
  return dbPath;
};

interface Config {
  [key: string]: string;
}

const setConfig = (configKey: string, configValue: string) => {
  let config: Config = {};
  if (fs.existsSync(configPath)) {
    config = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
  }
  config[configKey] = configValue;
  fs.writeFileSync(configPath, JSON.stringify(config), 'utf-8');
};

const getConfig = (configKey: string) => {
  if (fs.existsSync(configPath)) {
    const config = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
    return config[configKey];
  }
  return null;
};

const initializeControllers = () => {
  if (productController) {
    productController.destroy();
  }
  if (incrementController) {
    incrementController.destroy();
  }
  if (modelController) {
    modelController.destroy();
  }
  if (versionController) {
    versionController.destroy();
  }

  productController = new ProductController();
  incrementController = new IncrementController();
  modelController = new ModelController();
  versionController = new VersionController();
};

import('electron-unhandled')
  .then((m) => {
    console.log('Loaded electron-unhandled');
  })
  .catch((err) => {
    console.error(`Error during loading module: ${err}`);
  });

let mainWindow: BrowserWindow | null = null;

if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support');
  sourceMapSupport.install();
}

const isDebug =
  process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true';

if (isDebug) {
  require('electron-debug')();
}

const installExtensions = async () => {
  const installer = require('electron-devtools-installer');
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  const extensions = ['REACT_DEVELOPER_TOOLS'];

  return installer
    .default(
      extensions.map((name) => installer[name]),
      forceDownload,
    )
    .catch(console.log);
};

const createWindow = async () => {
  if (isDebug) {
    await installExtensions();
  }

  const RESOURCES_PATH = app.isPackaged
    ? path.join(process.resourcesPath, 'assets')
    : path.join(__dirname, '../../assets');

  const getAssetPath = (...paths: string[]): string => {
    return path.join(RESOURCES_PATH, ...paths);
  };

  const { width, height } = screen.getPrimaryDisplay().workAreaSize;

  mainWindow = new BrowserWindow({
    show: false,
    width,
    height,
    minWidth: 800,
    minHeight: 700,
    icon: getAssetPath('icon.png'),
    webPreferences: {
      preload:
        process.env.NODE_ENV === 'development'
          ? path.join(__dirname, '../../.erb/dll/preload.js')
          : path.join(__dirname, 'preload.js'),
    },
  });

  mainWindow.loadURL(resolveHtmlPath('index.html'));

  if (process.env.NODE_ENV === 'development') {
    mainWindow.webContents.openDevTools();
  }

  /**
   * mainWindow listeners
   */
  mainWindow.on('ready-to-show', async () => {
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined');
    }
    if (process.env.START_MINIMIZED) {
      mainWindow.minimize();
    } else {
      mainWindow.show();
    }
  });

  mainWindow.on('close', (event) => {
    if (!isQuitting) {
      event.preventDefault();
      dialog
        .showMessageBox(mainWindow!, {
          type: 'warning',
          buttons: ['Cancel', 'Quit'],
          defaultId: 1,
          cancelId: 0,
          title: 'Confirm',
          message: 'Do you really want to quit?',
          detail: 'All unsaved changes will be lost.',
          icon: getAssetPath('icon.png'),
        })
        .then((result) => {
          if (result.response === 1) {
            isQuitting = true;
            app.quit();
          }
        });
    }
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  /**
   * ipc handlers for persisting some settings in the nextm config file.
   * allows some settings to be stored throughout multiple sessions.
   * can be compared with storing cookies in the web browser. 
   */

  /**
   * open file dialog in settings to create a new custom database
   */
  ipcMain.handle('open-file-dialog', async (event) => {
    try {
      if (!mainWindow) {
        throw new Error('Main window is not ready');
      }

      const result = await dialog.showOpenDialog(mainWindow!, {
        properties: ['openFile'],
        filters: [{ name: 'Database Files', extensions: ['db', 'sqlite'] }],
      });
      if (!result.canceled && result.filePaths.length > 0) {
        return result.filePaths[0];
      }
      throw new Error('No file selected');
    } catch (error) {
      console.error('Error opening file dialog:', error);
      throw error;
    }
  });

  /**
   * open directory dialog in settings to open an existing custom database
   */
  ipcMain.handle('open-directory-dialog', async (event) => {
    try {
      if (!mainWindow) {
        throw new Error('Main window is not ready');
      }

      const result = await dialog.showOpenDialog(mainWindow, {
        properties: ['openDirectory'],
      });

      if (!result.canceled && result.filePaths.length > 0) {
        return result.filePaths[0];
      }
      throw new Error('No directory selected');
    } catch (error) {
      console.error('Error opening directory dialog:', error);
      throw error;
    }
  });

  /**
   * create the new db at the location passed via open-directory-dialog
   */
  ipcMain.handle('create-database', async (event, input) => {
    try {
      fs.accessSync(input, fs.constants.F_OK);

      let count = 1;
      let dbPath = input;

      console.log(input);

      while (true) {
        try {
          const filename = `nextm${count >= 2 ? count : ''}.db`;
          dbPath = path.join(input, filename);

          if (fs.existsSync(dbPath)) {
            count++;
            continue;
          } else {
            break;
          }
        } catch (error) {
          break; // Break the loop if the file does not exist
        }
      }

      const result = await initializeDataSource(dbPath);

      if (result) {
        // persist current dbPath in config file
        setConfig('databasePath', dbPath);
        initializeControllers();
        return { success: true, message: 'Database created successfully' };
      }
      return { success: false, message: 'Failed to create database' };
    } catch (error) {
      console.error('Error creating database:', error);
      return { success: false, message: error };
    }
  });

  /**
   * open the existing db at the location passed via open-file-dialog
   */
  ipcMain.handle('open-database', async (event, input) => {
    try {
      console.log(input);
      let dbPath = input;

      // Check if the file exists
      if (input === 'default') {
        dbPath =
          process.env.NODE_ENV === 'development'
            ? 'nextm.db'
            : path.resolve(app.getPath('userData'), 'nextm.db');
      } else if (fs.existsSync(input)) {
        dbPath = input;
      } else {
        return { success: false, message: 'Invalid input specified' };
      }

      const result = await initializeDataSource(dbPath);

      if (result) {
        // persist current dbPath in config file
        setConfig('databasePath', dbPath);
        initializeControllers();
        return { success: true, message: 'Database opened successfully' };
      }
      return { success: false, message: 'Unable to open database' };
    } catch (error) {
      console.error(error);
      return { success: false, error };
    }
  });

  /**
   * get the default db path when no custom db is specified
   */
  ipcMain.handle('get-default-db-path', async (event) => {
    return getDefaultDbPath();
  });

  /**
   * get the current db path when app is started
   */
  ipcMain.handle('get-current-db-path', async (event) => {
    return getConfig('databasePath');
  });

  /**
   * set a new grid type in the model editor
   */
  ipcMain.handle('set-grid-type', async (event, input) => {
    try {
      if (input === 'none' || 'dot' || 'mesh') {
        setConfig('gridType', input);
        return { success: false, message: 'Grid type set successfully' };
      }
    } catch (error) {
      console.error(error);
      return { success: false, error };
    }
  });

  /**
   * get the current grid type in the model editor
   */
  ipcMain.handle('get-grid-type', async (event) => {
    return getConfig('gridType');
  });

  /**
   * set explicit object selection in the model editor
   */
  ipcMain.handle('set-explicit-object-selection', async (event, input) => {
    try {
      if (input === true || false) {
        setConfig('explicitObjectSelection', input);
        return { success: false, message: 'Grid type set successfully' };
      }
    } catch (error) {
      console.error(error);
      return { success: false, error };
    }
  });

  /**
   * get explicit object selection in the model editor
   */
  ipcMain.handle('get-explicit-object-selection', async (event) => {
    return getConfig('explicitObjectSelection');
  });

  const menuBuilder = new MenuBuilder(mainWindow);
  menuBuilder.buildMenu();

  // Open urls in the user's browser
  mainWindow.webContents.setWindowOpenHandler((edata) => {
    shell.openExternal(edata.url);
    return { action: 'deny' };
  });
};

app.on('window-all-closed', () => {
  // Respect the OSX convention of having the application in memory even
  // after all windows have been closed
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app
  .whenReady()
  .then(async () => {
    let dbPath = getConfig('databasePath');

    if (!dbPath) {
      dbPath = getDefaultDbPath();
      setConfig('databasePath', dbPath);
    }

    // Initialize the data source
    await initializeDataSource(dbPath); 
    initializeControllers();

    createWindow();

    app.on('activate', () => {
      // On macOS it's common to re-create a window in the app when the
      // dock icon is clicked and there are no other windows open.
      if (mainWindow === null) createWindow();
    });
  })
  .catch(console.log);
