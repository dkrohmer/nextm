// Disable no-unused-vars, broken for spread args
/* eslint no-unused-vars: off */
import { contextBridge, ipcRenderer } from 'electron';

// TODO: change "payload: any" to respective types.
const electronHandler = {
  // general
  env: process.env.NODE_ENV,
  openFilePicker: () => ipcRenderer.invoke('open-file-dialog'),
  openDirectoryPicker: () => ipcRenderer.invoke('open-directory-dialog'),
  createDatabase: (path: string) => ipcRenderer.invoke('create-database', path),
  openDatabase: (path: string) => ipcRenderer.invoke('open-database', path),
  getDefaultDbPath: () => ipcRenderer.invoke('get-default-db-path'),
  getCurrentDbPath: () => ipcRenderer.invoke('get-current-db-path'),
  getGridType: () => ipcRenderer.invoke('get-grid-type'),
  setGridType: (value: string) => ipcRenderer.invoke('set-grid-type', value),
  getExplicitObjectSelection: () =>
    ipcRenderer.invoke('get-explicit-object-selection'),
  setExplicitObjectSelection: (value: boolean) =>
    ipcRenderer.invoke('set-explicit-object-selection', value),

  // product
  getAllProducts: (payload: any) =>
    ipcRenderer.invoke('get-all-products', payload),
  getProductById: (payload: any) =>
    ipcRenderer.invoke('get-product-by-id', payload),
  createProduct: (payload: any) =>
    ipcRenderer.invoke('create-product', payload),
  updateProduct: (payload: any) =>
    ipcRenderer.invoke('update-product', payload),
  deleteProduct: (payload: any) =>
    ipcRenderer.invoke('delete-product', payload),
  // increment
  getAllIncrements: (payload: any) =>
    ipcRenderer.invoke('get-all-increments', payload),
  getIncrementById: (payload: any) =>
    ipcRenderer.invoke('get-increment-by-id', payload),
  getLatestIncrement: (payload: any) =>
    ipcRenderer.invoke('get-latest-increment', payload),
  createIncrement: (payload: any) =>
    ipcRenderer.invoke('create-increment', payload),
  updateIncrement: (payload: any) =>
    ipcRenderer.invoke('update-increment', payload),
  deleteIncrement: (payload: any) =>
    ipcRenderer.invoke('delete-increment', payload),
  // model
  getAllModels: (payload: any) => ipcRenderer.invoke('get-all-models', payload),
  getModelById: (payload: any) =>
    ipcRenderer.invoke('get-model-by-id', payload),
  createModel: (payload: any) => ipcRenderer.invoke('create-model', payload),
  updateModel: (payload: any) => ipcRenderer.invoke('update-model', payload),
  deleteModel: (payload: any) => ipcRenderer.invoke('delete-model', payload),
  // version
  getAllVersions: (payload: any) =>
    ipcRenderer.invoke('get-all-versions', payload),
  getVersionById: (payload: any) =>
    ipcRenderer.invoke('get-version-by-id', payload),
  getLatestVersion: (payload: any) =>
    ipcRenderer.invoke('get-latest-version', payload),
  createVersion: (payload: any) =>
    ipcRenderer.invoke('create-version', payload),
  deleteVersion: (payload: any) =>
    ipcRenderer.invoke('delete-version', payload),
};

contextBridge.exposeInMainWorld('electron', electronHandler);
// contextBridge.exposeInMainWorld('rendererApi', rendererApiHandler);

export type ElectronHandler = typeof electronHandler;
// export type RendererApiHandler = typeof rendererApiHandler;
