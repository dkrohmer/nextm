import { ElectronHandler } from './main/preload';

declare global {
  // eslint-disable-next-line no-unused-vars
  interface Window {
    electron: ElectronHandler;
  }

  interface DialogOptions {
    defaultPath?: string;
    filters?: FileFilter[];
    // Add other properties as needed
  }

  interface FileFilter {
    name: string;
    extensions: string[];
  }

  type DialogType = 'file' | 'directory';
}

export {};
