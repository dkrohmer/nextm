import { Setting } from '../models/Setting';
import { initializeDataSource } from '../database';
import { SettingRepository } from '../repositories/SettingRepository';
import fs from 'fs';
import path from 'path';

export class SettingService {
  private settingRepository = new SettingRepository();

  /**
   * create DB path
   */
  async createDbPathSetting(dbPath: string): Promise<Setting> {
    if (!fs.existsSync(dbPath)) {
      throw new Error('The specified path does not exist');
    }

    const absolutePath = path.resolve(dbPath);
    const newDatabasePath = path.join(absolutePath, 'database.sqlite');

    if (!fs.existsSync(newDatabasePath)) {
      fs.closeSync(fs.openSync(newDatabasePath, 'w'));
    }

    let setting = await this.settingRepository.getSettingByKey('db-path');
    if (!setting) {
      setting = new Setting();
      setting.key = 'db-path';
      setting.value = newDatabasePath;
    } else {
      setting.value = newDatabasePath;
    }

    const savedSetting = await this.settingRepository.saveSetting(setting);

    await initializeDataSource(newDatabasePath);

    return savedSetting;
  }

  /**
   * get setting
   */
  async getSettingByKey(key: string): Promise<Setting | null> {
    return await this.settingRepository.getSettingByKey(key);
  }
}
